const express = require("express");
const router = express.Router();
const OfferController = require("./Offer_Controller.js");

router.post("/createoffer", OfferController.createOffer);
router.get("/getalloffers", OfferController.getAllOffers);
router.get("/getoffer/:offerId", OfferController.getOfferById);
router.put("/updateoffer/:offerId", OfferController.updateOfferById);
router.delete("/deleteoffer/:offerId", OfferController.deleteOfferById);

module.exports = router;
