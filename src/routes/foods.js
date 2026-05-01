const express = require("express");
const router = express.Router();

const {
  createFood,
  getFoods,
  updateFood,
  deleteFood,
} = require("../controllers/foodController");

// CREATE
router.post("/", createFood);

// READ
router.get("/", getFoods);

// UPDATE
router.put("/:id", updateFood);

// DELETE
router.delete("/:id", deleteFood);

module.exports = router;
