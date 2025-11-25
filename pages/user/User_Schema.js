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
      required: true,
      trim: true,
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

    address: {
      home: {
        address_name: { type: String },
        latitude: { type: Number },
        longitude: { type: Number },
      },

      work: {
        address_name: { type: String },
        latitude: { type: Number },
        longitude: { type: Number },
      }
    },

    status: {
      type: String,
      default: "Active",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
