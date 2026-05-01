// routes/auth.js
const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/authController");

console.log("AUTH ROUTES FILE LOADED");
router.post("/register", register);
router.post("/login", login);

router.get("/test", (req, res) => {
  res.send("auth route works");
});
module.exports = router;
