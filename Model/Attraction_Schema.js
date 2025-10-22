const mongoose = require("mongoose");

const attractionSchema = new mongoose.Schema(
  {
    attractionID: {
      type: String,
    },
    title: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    linked_store: {
      type: [String], // ["STO-1", "STO-2"]
      default: [],
    },
    status: {
      type: String, 
      default: "active",
    },
    added_on: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const Attraction = mongoose.model("Attraction", attractionSchema);

module.exports = Attraction;
