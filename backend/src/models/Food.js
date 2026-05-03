const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    quantity: {
      type: String, // Changed from Number to String to allow "10 boxes" or "5kg"
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    pickup_time: { // Added this field to match your UI
      type: String,
      required: true,
    },
    restaurant_id: { // Added to link the food to the user who posted it
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["available", "pending", "taken"],
      default: "available",
    }
  },
  { timestamps: true },
);

module.exports = mongoose.model("Food", foodSchema);