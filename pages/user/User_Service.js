const User = require("./User_Schema");
const StoreService = require("../store/Store_Service");

exports.createUser = async (userdata) => {
  const { phone } = userdata;
  if (!phone) throw new Error("Phone number is required");

  let existing = await User.findOne({ phone });
  if (existing) return existing;

  const lastUser = await User.findOne({})
    .sort({ userId: -1 })
    .collation({ locale: "en_US", numericOrdering: true });

  let nextNumber = 1;

  if (lastUser && lastUser.userId) {
    const lastNumber = parseInt(lastUser.userId.split("-")[1], 10);
    nextNumber = lastNumber + 1;
  }

  const userId = `USR-${nextNumber}`;

  const newUser = new User({
    userId,
    user_name: userdata.user_name || "",
    phone,
    email: userdata.email || `user${Date.now()}@example.com`,
    user_img: userdata.user_img || null,
    current_location: {
      latitude: null,
      longitude: null,
      updated_at: null,
    },
    store: null,
    membership_type: "Standard",
    status: "Active",
    address: [],
  });

  return await newUser.save();
};

exports.getUserByPhone = async (phone) => {
  return await User.findOne({ phone });
};

exports.updateCurrentLocation = async (userId, latitude, longitude) => {
  const user = await User.findOne({ userId });
  if (!user) throw new Error("User not found");

  user.current_location = {
    latitude,
    longitude,
    updated_at: new Date(),
  };

  await user.save();

  const nearestStores = await StoreService.getStoresNearLocation(
    latitude,
    longitude,
    10000,
    1
  );

  if (nearestStores.length > 0) {
    user.store = nearestStores[0].storeId;
    await user.save();
  }

  return user;
};
//   const user = await User.findOne({ userId });
//   if (!user) throw new Error("User not found");

//   const { latitude, longitude } = user.current_location || {};
//   if (!latitude || !longitude) throw new Error("User current location not set");

//   const nearestStores = await StoreService.getStoresNearLocation(
//     latitude,
//     longitude,
//     10000,
//     1
//   );

//   if (!nearestStores.length) throw new Error("No nearby stores");

//   user.store = nearestStores[0].storeId;
//   await user.save();
//   return user;
// };

exports.addAddress = async (userId, addressData) => {
  const user = await User.findOne({ userId });
  if (!user) throw new Error("User not found");

  user.address.push({
    name: addressData.name,
    location: addressData.location,
  });

  await user.save();
  return user;
};


exports.getAllUsers = async () => {
  return await User.find();
};

exports.getUserById = async (userId) => {
  const user = await User.findOne({ userId });
  if (!user) throw new Error("User not found");
  return user;
};

exports.updateUserById = async (userId, updateData) => {
  const updated = await User.findOneAndUpdate({ userId }, updateData, {
    new: true,
    runValidators: true,
  });
  if (!updated) throw new Error("User not found");
  return updated;
};

exports.deleteUserById = async (userId) => {
  const deleted = await User.findOneAndDelete({ userId });
  if (!deleted) throw new Error("User not found");
  return deleted;
};
