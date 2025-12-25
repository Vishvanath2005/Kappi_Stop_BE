const mongoose = require("mongoose");

const planBenefitSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { _id: false }
);

const membershipPlanSchema = new mongoose.Schema(
  {
    plan_name: {
      type: String,
      required: true,
      trim: true,
      unique:true,
    },

    plan_description: {
      type: String,
      required: true,
      trim: true,
    },

    plan_img: {
      type: String,
      required:true
    },

    price: {
      type: Number,
      required: true,
    },

    validity: {
      type: String,
      required: true,
    },

    terms_and_conditions: {
      type: String,
      required: true,
    },

    plan_benefits: {
      type: [planBenefitSchema],
      default: [],
    },
    cancellation_policy: {
      type: String,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("MembershipPlan", membershipPlanSchema);
