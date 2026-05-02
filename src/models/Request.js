const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema(
  {
    food: {
      type: String,
      ref: "Food",
      required: true,
    },

    requester: {
      type: String,
      ref: "User",
      required: true,
    },

    status: {
      type: String,
      enum: ["pending", "accepted", "rejected", "picked_up"],
      default: "pending",
    },

    message: {
      type: String,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Request", requestSchema);
