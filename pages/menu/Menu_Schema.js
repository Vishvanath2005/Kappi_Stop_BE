const mongoose = require("mongoose");

const menuSchema = new mongoose.Schema(
  {
    productId: { type: String },
    product_name: { type: String },
    product_img: { type: String },
    description: { type: String },
    category: { type: String },
    type: { type: String },
    price: { type: Number },
    available_store: { type: [String] },
    last_updated: { type: Date, default: Date.now },
    status: { type: String },
  },
  { timestamps: true }
);

const Menu = mongoose.model("Menu", menuSchema);
module.exports = Menu;
