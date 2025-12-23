const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema(
  {
    productId: { type: String, required: true },
    product_img:{type:String},
    product_name: { type: String, required: true },
    price: { type: Number, required: true },
    count: { type: Number, required: true, default: 1 },
    total: { type: Number, required: true },
  },
  { _id: false }
);

const cartSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    orderId: { type: String, unique: true },
    date: { type: Date, default: Date.now },
     address: { type: String },
    time: { type: String },
    payment_type: { type: String ,default:null},
    payment_status: { type: String ,default:null},
    transaction_id: { type: String ,default:null},
    sub_total_amount: { type: Number, default: 0 },
    discount: { type: Number, default: 0 },
    grand_total: { type: Number, default: 0 },
    order_note: { type: String },
    order_status: { type: String, default: "Cart" },
    order_details: [cartItemSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cart", cartSchema);
