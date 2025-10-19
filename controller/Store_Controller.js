const StoreService = require("../service/Store_Service");

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
