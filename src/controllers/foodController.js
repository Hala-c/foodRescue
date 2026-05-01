const Food = require("../models/Food");

// create food
exports.createFood = async (req, res) => {
  try {
    const food = await Food.create(req.body);
    res.status(201).json(food);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

// get all foods
exports.getFoods = async (req, res) => {
  try {
    const foods = await Food.find();
    res.json(foods);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

exports.updateFood = async (req, res) => {
  try {
    const food = await Food.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(food);
  } catch (err) {
    res.status(500).json({ msg: "Error updating food" });
  }
};

exports.deleteFood = async (req, res) => {
  try {
    await Food.findByIdAndDelete(req.params.id);
    res.json({ msg: "Food deleted" });
  } catch (err) {
    res.status(500).json({ msg: "Error deleting food" });
  }
};
