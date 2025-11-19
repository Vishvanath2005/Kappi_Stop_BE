const attractionService = require('./Attraction_Service');

exports.createAttraction = async (req, res) => {
  try {
    const attractionData = req.body;
    const newAttraction = await attractionService.createAttraction(attractionData);
    res.status(201).json({
      success: true,
      message: "Attraction created successfully",
      data: newAttraction,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message || "Failed to create attraction",
    });
  }
};

exports.getAllAttractions = async (req, res) => {
  try {
    const attractions = await attractionService.getAllAttractions();
    res.status(200).json({
      success: true,
      count: attractions.length,
      data: attractions,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch attractions",
    });
  }
};

exports.getAttractionById = async (req, res) => {
  try {
    const { attractionID } = req.params;
    const attraction = await attractionService.getAttractionById(attractionID);
    res.status(200).json({
      success: true,
      data: attraction,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message || "Attraction not found",
    });
  }
};

exports.updateAttractionById = async (req, res) => {
  try {
    const { attractionID } = req.params;
    const attractionData = req.body;
    const updatedAttraction = await attractionService.updateAttractionById(
      attractionID,
      attractionData
    );
    res.status(200).json({
      success: true,
      message: "Attraction updated successfully",
      data: updatedAttraction,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message || "Failed to update attraction",
    });
  }
};

exports.deleteAttractionById = async (req, res) => {
  try {
    const { attractionID } = req.params;
    const deletedAttraction = await attractionService.deleteAttractionById(attractionID);
    res.status(200).json({
      success: true,
      message: "Attraction deleted successfully",
      data: deletedAttraction,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message || "Failed to delete attraction",
    });
  }
};
