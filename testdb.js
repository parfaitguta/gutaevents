// testdb.js
const { Pool } = require("pg");

const DATABASE_URL =
  "postgresql://postgres.mpgyzrsqkpwpdmzefuks:uAhCymfPbsZk1twv@aws-1-eu-north-1.pooler.supabase.com:5432/gutaevents";

const pool = new Pool({
  connectionString: DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // Required for Supabase hosted DB
  },
});

pool.on("connect", () => {
  console.log("Connected to gutaevents database successfully!");
});

pool.on("error", (err) => {
  console.error("Unexpected DB error", err);
});

module.exports = pool;