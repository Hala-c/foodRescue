// middleware/auth.js
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) return res.status(401).json({ msg: "No token" });

  try {
    const decoded = jwt.verify(token, "secret");
    req.user = decoded; // { id, role }
    next();
  } catch {
    res.status(401).json({ msg: "Invalid token" });
  }
};