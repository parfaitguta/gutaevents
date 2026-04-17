require("dotenv").config();

const express = require("express");
const cors = require("cors");
const pool = require("./testdb");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const app = express();

/* ================= ENV ================= */
const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is required in .env");
}

const PORT = process.env.PORT || 8080;

/* ================= MIDDLEWARE ================= */
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* ================= STATIC FILES ================= */
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

/* ================= UPLOAD FOLDER ================= */
const uploadDir = path.join(__dirname, "uploads");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

/* ================= MULTER ================= */
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname)),
});

const upload = multer({ storage });

/* ================= AUTH MIDDLEWARE ================= */
function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(403).json({ error: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "Invalid token" });
    }

    req.user = decoded;
    next();
  });
}

/* ================= ADMIN MIDDLEWARE ================= */
function verifyAdmin(req, res, next) {
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({ error: "Admin only access" });
  }
  next();
}

/* ================= HEALTH CHECK ================= */
app.get("/", (req, res) => {
  res.json({
    message: "Guta Events API Running 🚀",
    status: "OK",
  });
});

/* ================= LOGIN ================= */
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password required" });
    }

    const result = await pool.query(
      "SELECT * FROM users WHERE email=$1",
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(400).json({ error: "Invalid login" });
    }

    const user = result.rows[0];

    if (!user || !user.password) {
      return res.status(500).json({ error: "User data corrupted" });
    }

    let match = false;

    if (user.password && user.password.startsWith("$2b$")) {
      match = await bcrypt.compare(password, user.password);
    } else {
      match = password === user.password;
    }

    if (!match) {
      return res.status(400).json({ error: "Invalid login" });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      token,
      user: {
        id: user.id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
        bio: user.bio,
      },
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ================= PROFILE ================= */
app.get("/me", verifyToken, async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT id, firstname, lastname, email, bio, avatar
       FROM users WHERE id=$1`,
      [req.user.id]
    );

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ================= UPDATE PROFILE ================= */
app.put("/profile", verifyToken, upload.single("avatar"), async (req, res) => {
  try {
    const { firstname, lastname, bio } = req.body;

    const avatar = req.file ? `/uploads/${req.file.filename}` : undefined;

    const result = await pool.query(
      `UPDATE users 
       SET firstname=$1, lastname=$2, bio=$3,
       avatar = COALESCE($4, avatar)
       WHERE id=$5
       RETURNING id, firstname, lastname, email, bio, avatar`,
      [firstname, lastname, bio, avatar, req.user.id]
    );

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ================= EVENTS ================= */
app.get("/events", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM events ORDER BY id ASC"
    );

    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/events/:id", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM events WHERE id=$1",
      [req.params.id]
    );

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ================= CREATE EVENT ================= */
app.post("/events", verifyToken, verifyAdmin, upload.single("image"), async (req, res) => {
  try {
    const { title, location, event_date, price, seats } = req.body;

    const image = req.file ? `/uploads/${req.file.filename}` : null;

    const result = await pool.query(
      `INSERT INTO events (title, location, event_date, price, seats, image)
       VALUES ($1,$2,$3,$4,$5,$6)
       RETURNING *`,
      [title, location, event_date, price, seats, image]
    );

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ================= UPDATE EVENT ================= */
app.put("/events/:id", verifyToken, verifyAdmin, async (req, res) => {
  try {
    const { title, location, event_date, price, seats } = req.body;

    const result = await pool.query(
      `UPDATE events 
       SET title=$1, location=$2, event_date=$3, price=$4, seats=$5
       WHERE id=$6
       RETURNING *`,
      [title, location, event_date, price, seats, req.params.id]
    );

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ================= DELETE EVENT ================= */
app.delete("/events/:id", verifyToken, verifyAdmin, async (req, res) => {
  try {
    await pool.query("DELETE FROM events WHERE id=$1", [req.params.id]);
    res.json({ message: "Event deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ================= BOOK EVENT ================= */
app.post("/book", verifyToken, async (req, res) => {
  try {
    const { event_id, tickets } = req.body;

    const ticketCount = Number(tickets);

    const eventRes = await pool.query(
      "SELECT * FROM events WHERE id=$1",
      [event_id]
    );

    if (eventRes.rows.length === 0) {
      return res.status(404).json({ error: "Event not found" });
    }

    const event = eventRes.rows[0];

    if (event.seats < ticketCount) {
      return res.status(400).json({ error: "Not enough seats" });
    }

    const booking = await pool.query(
      `INSERT INTO bookings (user_id,event_id,tickets)
       VALUES ($1,$2,$3)
       RETURNING *`,
      [req.user.id, event_id, ticketCount]
    );

    await pool.query(
      `UPDATE events SET seats = seats - $1 WHERE id=$2`,
      [ticketCount, event_id]
    );

    res.json({
      message: "Booking successful",
      booking: booking.rows[0],
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ================= MY BOOKINGS ================= */
app.get("/my-bookings", verifyToken, async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT bookings.id,
              events.title,
              events.location,
              events.event_date,
              bookings.tickets
       FROM bookings
       JOIN events ON bookings.event_id = events.id
       WHERE bookings.user_id=$1`,
      [req.user.id]
    );

    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ================= ADMIN USERS ================= */
app.get("/users", verifyToken, verifyAdmin, async (req, res) => {
  const result = await pool.query(
    "SELECT id, firstname, lastname, email, role FROM users ORDER BY id ASC"
  );

  res.json(result.rows);
});

/* ================= START SERVER ================= */
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});