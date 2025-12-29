const mongoose = require("mongoose");

const offerSchema = new mongoose.Schema(
  {
    offerId: {
      type: String,
    },
      offer_img: {
      type: String,
      required:true
    },
    title: {
      type: String,
      required: true,
    },
    offer_type: {
      type: String, 
      required: true,
    },
    discount: {
      type: Number,
      required: true,
    },
    valid_from: {
      type: Date,
      required: true,
    },
    valid_to: {
      type: Date,
      required: true,
    },
    applicable_store: {
      type: [String],  //["STO-1", "STO-2"]
      default: [],
    },
  },
  { timestamps: true }
);

const Offer = mongoose.model("Offer", offerSchema);

module.exports = Offer;
