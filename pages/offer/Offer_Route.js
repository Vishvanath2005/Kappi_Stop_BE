const express = require("express");
const router = express.Router();
const OfferController = require("./Offer_Controller");
const uploadOffer = require("../../middleware/Upload.js")("offer");

router.post(
  "/createoffer",
  uploadOffer.single("offer_img"),
  OfferController.createOffer
);

router.get("/getalloffers", OfferController.getAllOffers);
router.get("/getoffer/:offerId", OfferController.getOfferById);

router.put(
  "/updateoffer/:offerId",
  uploadOffer.single("offer_img"),
  OfferController.updateOfferById
);

router.delete("/deleteoffer/:offerId", OfferController.deleteOfferById);

module.exports = router;
