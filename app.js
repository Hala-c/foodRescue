const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./src/config/db");
const requestRoutes = require("./src/routes/requests");
const authRoutes = require("./src/routes/auth");

dotenv.config();
connectDB();

console.log("APP STARTED");
const app = express();

// Middleware
app.use(express.json());

// Test Route
app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use("/api/auth", authRoutes);

app.use("/api/requests", requestRoutes);

app.use("/api/foods", require("./src/routes/foods"));
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
