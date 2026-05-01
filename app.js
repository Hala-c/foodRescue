const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./src/config/db");

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(express.json());

// Test Route
app.get("/", (req, res) => {
  res.send("API is running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
