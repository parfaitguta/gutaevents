require("dotenv").config();

const { Pool } = require("pg");

/* ================= DATABASE CONNECTION ================= */
const pool = new Pool({
  connectionString:
    process.env.DATABASE_URL ||
    "postgresql://postgres.mpgyzrsqkpwpdmzefuks:uAhCymfPbsZk1twv@aws-1-eu-north-1.pooler.supabase.com:5432/gutaevents",

  ssl: {
    rejectUnauthorized: false,
  },
});

/* ================= TEST CONNECTION ================= */
pool.connect()
  .then(() => {
    console.log("Connected to gutaevents database successfully!");
  })
  .catch((err) => {
    console.error("Database connection failed:", err.message);
  });

/* ================= ERROR HANDLER ================= */
pool.on("error", (err) => {
  console.error("Unexpected DB error:", err);
});

module.exports = pool;