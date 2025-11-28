const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    user_name: {
      type: String,
      trim: true,
      default: null,
    },
    user_img: {
      type: String,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      sparse: true,
      lowercase: true,
      trim: true,
    },
    wallet_balance: {
      type: Number,
      default: 0,
    },
    membership_type: {
      type: String,
      default: "Standard",
    },
    store: {
      type: String,
      default: null,
    },
    address: [
      {
        name: { type: String, required: true },
        location: { type: String, required: true },
      },
    ],
    current_location: {
      latitude: { type: Number, default: null },
      longitude: { type: Number, default: null },
      updated_at: { type: Date, default: null },
    },
    status: {
      type: String,
      default: "Active",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
