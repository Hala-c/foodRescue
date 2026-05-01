const express = require("express");
const router = express.Router();
const role=require("../middleware/role");
const auth=require("../middleware/auth");
const {
  createFood,
  getFoods,
  updateFood,
  deleteFood,
} = require("../controllers/foodController");

// CREATE
router.post("/",auth ,role("restaurant"),createFood);

// READ
router.get("/",auth,getFoods);

// UPDATE
router.put("/:id",auth,role("restaurant") ,updateFood);

// DELETE
router.delete("/:id",auth,role("restaurant"), deleteFood);

module.exports = router;
