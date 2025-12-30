const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
  {
    transaction_id: {
      type: String,
      required: true,
      unique: true,
    },

    user_id: {
      type: String, // USR-1, USR-2
      required: true,
    },

    membership_plan_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "MembershipPlan",
      required: true,
    },

    payment_type: {
      type: String,
      enum: ["UPI", "CARD", "NET_BANKING", "CASH"],
      required: true,
    },

    payment_status: {
      type: String,
      enum: ["PENDING", "SUCCESS", "FAILED"],
      default: "PENDING",
    },

    amount: {
      type: Number,
      required: true,
    },

    payment_response: {
      type: Object, // gateway response (optional)
      default: null,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Transaction", transactionSchema);
