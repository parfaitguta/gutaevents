const jwt = require("jsonwebtoken");
const JWT_SECRET = "guta_events_secret_key";

module.exports = function (req, res, next) {
  const authHeader = req.headers["authorization"];
  if (!authHeader) return res.status(403).json({ error: "No token" });

  const token = authHeader.split(" ")[1];

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ error: "Invalid token" });

    req.user = decoded;
    next();
  });
};