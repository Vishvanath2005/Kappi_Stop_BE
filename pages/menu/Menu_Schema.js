const mongoose = require("mongoose");

const addOnSchema = new mongoose.Schema(
  {
    add_name: { type: String },
    value: { type: Number },
  },
  { _id: false }
);

const menuSchema = new mongoose.Schema(
  {
    productId: { type: String },
    product_name: { type: String },
    product_img: { type: String },
    description: { type: String },
    category: { type: String },
    type: { type: String },
    price: { type: Number },

    add_ons: { type: [addOnSchema] },

    available_store: { type: [String] },
    last_updated: { type: Date, default: Date.now },
    status: { type: String },
  },
  { timestamps: true }
);

const Menu = mongoose.model("Menu", menuSchema);

module.exports = Menu;
