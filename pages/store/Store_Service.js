const { getDistance } = require("../../utils/Haversine");
const Store = require("./Store_Schema");

exports.createStore = async (storeData) => {
  const {
    store_name,
    city,
    address,
    store_number,
    opening_hours,
    status,
    latitude,
    longitude,
    // serviceRadiusMeters,
  } = storeData;

  const existingStore = await Store.findOne({ store_number });
  if (existingStore) {
    throw new Error("Store already exists with this number");
  }

  const count = await Store.countDocuments();
  const storeId = `STO-${count + 1}`;

  const newStore = new Store({
    storeId,
    store_name,
    city: city || "Unknown",
    address: address || "Not Provided",
    store_number,
    opening_hours: opening_hours || "09:00 AM - 09:00 PM",
    status: status || "Active",
    latitude,
    longitude,
    // serviceRadiusMeters: serviceRadiusMeters || 5000,
  });

  return await newStore.save();
};

exports.getAllStores = async () => {
  return await Store.find().select(
    "storeId store_name city address store_number opening_hours status latitude longitude "
  );
};

exports.getStoresNearLocation = async (lat, lon, maxDistance, limit) => {
  const stores = await Store.find();

  const storesWithDistance = stores.map((store) => {
    const distance = getDistance(
      lat,
      lon,
      store.latitude,
      store.longitude
    );

    return {
      ...store.toObject(),
      distance,
    };
  });

  const nearbyStores = storesWithDistance
    .filter((store) => store.distance <= maxDistance)
    .sort((a, b) => a.distance - b.distance)
    .slice(0, limit);

  return nearbyStores;
};

exports.getStoreById = async (storeId) => {
  const store = await Store.findOne({ storeId });
  if (!store) throw new Error("Store not found");
  return store;
};

exports.updateStoreById = async (storeId, storeData) => {
  const updatedStore = await Store.findOneAndUpdate({ storeId }, storeData, {
    new: true,
    runValidators: true,
  });

  if (!updatedStore) {
    throw new Error("Store not found");
  }

  return updatedStore;
};

exports.deleteStoreById = async (storeId) => {
  const deletedStore = await Store.findOneAndDelete({ storeId });
  if (!deletedStore) throw new Error("Store not found");
  return deletedStore;
};
