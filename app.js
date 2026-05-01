const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// routes
const authRoutes = require("./src/routes/auth");

const app = express();
require("dotenv").config();
// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);

// Connect to MongoDB
mongoose
  .connect("mongodb://hala55:hala12345@ac-nlmql2u-shard-00-00.kktu0jm.mongodb.net:27017,ac-nlmql2u-shard-00-01.kktu0jm.mongodb.net:27017,ac-nlmql2u-shard-00-02.kktu0jm.mongodb.net:27017/Smart-ecommerc?ssl=true&replicaSet=atlas-100wdu-shard-0&authSource=admin&appName=Cluster0")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});