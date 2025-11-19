const Attraction = require('./Attraction_Schema');

exports.createAttraction = async (attractionData) => {
  const { title, city, linked_store, status } = attractionData;

  const count = await Attraction.countDocuments();
  const attractionID = `ATT-${count + 1}`;

  const existingAttraction = await Attraction.findOne({ title });
  if (existingAttraction) {
    throw new Error("Attraction already exists with this title");
  }

  const newAttraction = new Attraction({
    attractionID,
    title,
    city,
    linked_store: linked_store || [],
    status: status || "active",
    added_on: new Date(),
  });

  return await newAttraction.save();
};

exports.getAllAttractions = async () => {
  return await Attraction.find().select(
    "attractionID title city linked_store status added_on"
  );
};

exports.getAttractionById = async (attractionID) => {
  const attraction = await Attraction.findOne({ attractionID });
  if (!attraction) {
    throw new Error("Attraction not found");
  }
  return attraction;
};

exports.updateAttractionById = async (attractionID, attractionData) => {
  const updatedAttraction = await Attraction.findOneAndUpdate(
    { attractionID },
    attractionData,
    { new: true, runValidators: true }
  );

  if (!updatedAttraction) {
    throw new Error("Attraction not found");
  }

  return updatedAttraction;
};

exports.deleteAttractionById = async (attractionID) => {
  const deletedAttraction = await Attraction.findOneAndDelete({ attractionID });
  if (!deletedAttraction) {
    throw new Error("Attraction not found");
  }
  return deletedAttraction;
};
