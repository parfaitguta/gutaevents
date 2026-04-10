// app.js
const express = require("express");
const pool = require("./testdb"); // PostgreSQL connection
const app = express();

app.use(express.json());

/* ================= HEALTH CHECK ================= */
app.get("/", (req, res) => {
  res.send("Guta Events API is running...");
});

/* ================= USERS ================= */

// GET all users
app.get("/users", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM users ORDER BY id ASC");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// CREATE user
app.post("/users", async (req, res) => {
  const { firstname, lastname, email, password } = req.body;

  if (!firstname || !lastname || !email || !password) {
    return res.status(400).json({ error: "Missing fields" });
  }

  try {
    // prevent duplicate email
    const check = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (check.rows.length > 0) {
      return res.status(400).json({ error: "Email already exists" });
    }

    const result = await pool.query(
      "INSERT INTO users (firstname, lastname, email, password) VALUES ($1,$2,$3,$4) RETURNING *",
      [firstname, lastname, email, password]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE user
app.put("/users/:id", async (req, res) => {
  const { id } = req.params;
  const { firstname, lastname, email, password } = req.body;

  if (!firstname || !lastname || !email || !password) {
    return res.status(400).json({ error: "Missing fields" });
  }

  try {
    const result = await pool.query(
      `UPDATE users
       SET firstname=$1,
           lastname=$2,
           email=$3,
           password=$4
       WHERE id=$5
       RETURNING *`,
      [firstname, lastname, email, password, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE user
app.delete("/users/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      "DELETE FROM users WHERE id=$1 RETURNING *",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ================= EVENTS ================= */

// GET all events
app.get("/events", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM events ORDER BY id ASC");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// CREATE event
app.post("/events", async (req, res) => {
  const { title, description, location, event_date, event_time } = req.body;

  if (!title || !location || !event_date) {
    return res.status(400).json({ error: "Missing fields" });
  }

  try {
    const result = await pool.query(
      `INSERT INTO events (title, description, location, event_date, event_time)
       VALUES ($1,$2,$3,$4,$5) RETURNING *`,
      [title, description || null, location, event_date, event_time || null]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ================= REGISTRATIONS ================= */

// GET all registrations
app.get("/registrations", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM registrations ORDER BY id ASC");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// CREATE registration
app.post("/registrations", async (req, res) => {
  const { user_id, event_id } = req.body;

  if (!user_id || !event_id) {
    return res.status(400).json({ error: "Missing fields" });
  }

  try {
    const result = await pool.query(
      "INSERT INTO registrations (user_id, event_id) VALUES ($1,$2) RETURNING *",
      [user_id, event_id]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ================= TICKETS ================= */

// GET all tickets
app.get("/tickets", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM tickets ORDER BY id ASC");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// CREATE ticket
app.post("/tickets", async (req, res) => {
  const { user_id, event_id } = req.body;

  if (!user_id || !event_id) {
    return res.status(400).json({ error: "Missing fields" });
  }

  try {
    const result = await pool.query(
      "INSERT INTO tickets (user_id, event_id) VALUES ($1,$2) RETURNING *",
      [user_id, event_id]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ================= START SERVER ================= */

const PORT = 8080;

app.listen(PORT, () =>
  console.log(`Server running at http://localhost:${PORT}`)
);