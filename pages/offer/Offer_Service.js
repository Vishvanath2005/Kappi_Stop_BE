const Offer = require("./Offer_Schema");

exports.createOffer = async (offerData) => {
  const {
    title,
    offer_type,
    discount,
    valid_from,
    valid_to,
    applicable_store,
  } = offerData;

  const count = await Offer.countDocuments();
  const offerId = `OFF-${count + 1}`;

  const existingOffer = await Offer.findOne({ title });
  if (existingOffer) {
    throw new Error("Offer already exists with this title");
  }

  const newOffer = new Offer({
    offerId,
    title,
    offer_type,
    discount,
    valid_from,
    valid_to,
    applicable_store: applicable_store || [],
  });

  return await newOffer.save();
};

exports.getAllOffers = async () => {
  return await Offer.find().select(
    "offerId title offer_type discount valid_from valid_to applicable_store"
  );
};

exports.getOfferById = async (offerId) => {
  const offer = await Offer.findOne({ offerId });
  if (!offer) {
    throw new Error("Offer not found");
  }
  return offer;
};

exports.updateOfferById = async (offerId, offerData) => {
  const updatedOffer = await Offer.findOneAndUpdate({ offerId }, offerData, {
    new: true,
    runValidators: true,
  });

  if (!updatedOffer) {
    throw new Error("Offer not found");
  }

  return updatedOffer;
};

exports.deleteOfferById = async (offerId) => {
  const deletedOffer = await Offer.findOneAndDelete({ offerId });
  if (!deletedOffer) {
    throw new Error("Offer not found");
  }
  return deletedOffer;
};
