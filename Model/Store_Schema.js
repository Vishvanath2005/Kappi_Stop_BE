const mongoose = require("mongoose");

const storeSchema = new mongoose.Schema(
  {
    storeId: {
      type: String
    },
    store_name: {
      type: String,
    },
    city: {
      type: String,
    },
    address: {
      type: String,
    },
    store_number: {
      type: Number,
    },
    opening_hours: {
      type: String,
    },
    status: {
      type: String,
    },
  },
  { timestamps: true }
);

const Store = mongoose.model("Store", storeSchema);

module.exports = Store;
