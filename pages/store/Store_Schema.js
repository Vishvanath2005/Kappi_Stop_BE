const mongoose = require("mongoose");

const storeSchema = new mongoose.Schema(
  {
    storeId: { type: String },

    store_name: { type: String },

    city: { type: String },

    address: { type: String },

    store_number: { type: Number },

    opening_hours: { type: String },

    status: { type: String },

    latitude: {
      type: Number,
      required: true,
    },
    longitude: {
      type: Number,
      required: true,
    },

    serviceRadiusMeters: {
      type: Number,
      default: 5000,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Store", storeSchema);
