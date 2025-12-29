const Offer = require("./Offer_Schema");

exports.createOffer = async (offerData) => {
  const {
    title,
    offer_type,
    discount,
    valid_from,
    valid_to,
    applicable_store,
    offer_img,
  } = offerData;

  const existingOffer = await Offer.findOne({ title });
  if (existingOffer) {
    throw new Error("Offer already exists with this title");
  }

  const lastOffer = await Offer.findOne().sort({ createdAt: -1 });

  let nextNumber = 1;
  if (lastOffer && lastOffer.offerId) {
    const lastNumber = parseInt(lastOffer.offerId.split("-")[1]);
    nextNumber = lastNumber + 1;
  }

  const offerId = `OFF-${String(nextNumber).padStart(4, "0")}`;

  const newOffer = new Offer({
    offerId,
    title,
    offer_type,
    discount,
    valid_from,
    valid_to,
    applicable_store: applicable_store || [],
    offer_img,
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
