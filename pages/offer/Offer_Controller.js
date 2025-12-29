const offerService = require("./Offer_Service");
const fs = require("fs");
const path = require("path");

exports.createOffer = async (req, res) => {
  try {
    const data = { ...req.body };

    if (req.file) {
      data.offer_img = req.file.filename;
    }

    const newOffer = await offerService.createOffer(data);

    res.status(201).json({
      success: true,
      message: "Offer created successfully",
      data: newOffer,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getAllOffers = async (req, res) => {
  try {
    const offers = await offerService.getAllOffers();
    res.status(200).json({
      success: true,
      count: offers.length,
      data: offers,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch offers",
    });
  }
};

exports.getOfferById = async (req, res) => {
  try {
    const { offerId } = req.params;
    const offer = await offerService.getOfferById(offerId);
    res.status(200).json({
      success: true,
      data: offer,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message || "Offer not found",
    });
  }
};

exports.updateOfferById = async (req, res) => {
  try {
    const { offerId } = req.params;
    const data = { ...req.body };

    const existingOffer = await offerService.getOfferById(offerId);

    // Replace image if new one uploaded
    if (req.file) {
      if (existingOffer.offer_img) {
        const oldImgPath = path.join(
          __dirname,
          "../../uploads/offer",
          existingOffer.offer_img
        );

        if (fs.existsSync(oldImgPath)) {
          fs.unlinkSync(oldImgPath);
        }
      }

      data.offer_img = req.file.filename;
    }

    const updatedOffer = await offerService.updateOfferById(offerId, data);

    res.status(200).json({
      success: true,
      message: "Offer updated successfully",
      data: updatedOffer,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

exports.deleteOfferById = async (req, res) => {
  try {
    const { offerId } = req.params;
    const deletedOffer = await offerService.deleteOfferById(offerId);

    res.status(200).json({
      success: true,
      message: "Offer deleted successfully",
      data: deletedOffer,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message || "Failed to delete offer",
    });
  }
};
