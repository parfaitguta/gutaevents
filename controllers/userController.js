const pool = require("../testdb");

/* GET ALL USERS (ADMIN ONLY) */
exports.getAllUsers = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT id, firstname, lastname, email, role FROM users ORDER BY id ASC"
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* DELETE USER */
exports.deleteUser = async (req, res) => {
  try {
    await pool.query("DELETE FROM users WHERE id=$1", [req.params.id]);
    res.json({ message: "User deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* UPDATE ROLE */
exports.updateRole = async (req, res) => {
  try {
    const { role } = req.body;

    const result = await pool.query(
      "UPDATE users SET role=$1 WHERE id=$2 RETURNING id, email, role",
      [role, req.params.id]
    );

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* UPDATE USER INFO */
exports.updateUser = async (req, res) => {
  try {
    const { firstname, lastname, email } = req.body;

    const result = await pool.query(
      `UPDATE users 
       SET firstname=$1, lastname=$2, email=$3
       WHERE id=$4
       RETURNING id, firstname, lastname, email, role`,
      [firstname, lastname, email, req.params.id]
    );

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};