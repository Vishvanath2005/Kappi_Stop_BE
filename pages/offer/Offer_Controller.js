const offerService = require('./Offer_Service');

exports.createOffer = async (req, res) => {
  try {
    const offerData = req.body;
    const newOffer = await offerService.createOffer(offerData);
    res.status(201).json({
      success: true,
      message: "Offer created successfully",
      data: newOffer,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message || "Failed to create offer",
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
    const offerData = req.body;
    const updatedOffer = await offerService.updateOfferById(offerId, offerData);

    res.status(200).json({
      success: true,
      message: "Offer updated successfully",
      data: updatedOffer,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message || "Failed to update offer",
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