const User_Schema = require("../user/User_Schema");
const StoreService = require("./Store_Service");

exports.createStore = async (req, res) => {
  try {
    const newStore = await StoreService.createStore(req.body);
    res.status(201).json({
      message: "Store Created Successfully",
      data: newStore,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

exports.getAllStores = async (req, res) => {
  try {
    const stores = await StoreService.getAllStores();
    res.status(200).json({
      message: "Stores Retrieved Successfully",
      count: stores.length,
      data: stores,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

exports.getStoresNearUser = async (req, res) => {
  try {
    const { userId } = req.params;
    let type = req.params.type || "home"; // default to 'home'

    const maxDistance = parseInt(req.query.maxDistance) || 5000;
    const limit = parseInt(req.query.limit) || 10;

    // Validate type
    const validTypes = ["home", "work"];
    if (!validTypes.includes(type)) {
      return res.status(400).json({
        message: `Invalid type parameter. Must be 'home' or 'work'`,
      });
    }

    const user = await User_Schema.findOne({ userId });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const userLocation = user.address?.[type];

    if (!userLocation || !userLocation.latitude || !userLocation.longitude) {
      return res.status(400).json({
        message: `User does not have a ${type} address set`,
      });
    }

    const { latitude, longitude } = userLocation;

    const stores = await StoreService.getStoresNearLocation(
      latitude,
      longitude,
      maxDistance,
      limit
    );

    res.status(200).json({
      message: "Stores near user retrieved successfully",
      user_location_type: type,
      user_coordinates: { latitude, longitude },
      count: stores.length,
      data: stores,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};


exports.getStoreById = async (req, res) => {
  try {
    const { storeId } = req.params;
    const store = await StoreService.getStoreById(storeId);
    res.status(200).json({
      message: "Store Retrieved Successfully",
      data: store,
    });
  } catch (error) {
    if (error.message === "Store not found") {
      return res.status(404).json({ message: "Store Not Found" });
    }
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

exports.updateStoreById = async (req, res) => {
  try {
    const { storeId } = req.params;
    const updatedStore = await StoreService.updateStoreById(storeId, req.body);
    res.status(200).json({
      message: "Store Updated Successfully",
      data: updatedStore,
    });
  } catch (error) {
    if (error.message === "Store not found") {
      return res.status(404).json({ message: "Store Not Found" });
    }
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

exports.deleteStoreById = async (req, res) => {
  try {
    const { storeId } = req.params;
    const deletedStore = await StoreService.deleteStoreById(storeId);
    res.status(200).json({
      message: "Store Deleted Successfully",
      data: deletedStore,
    });
  } catch (error) {
    if (error.message === "Store not found") {
      return res.status(404).json({ message: "Store Not Found" });
    }
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
