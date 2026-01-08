const User = require("./User_Schema");
const StoreService = require("../store/Store_Service");
const fs = require("fs");
const path = require("path"); 

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

exports.addAddress = async (userId, addressData) => {
  const user = await User.findOne({ userId });
  if (!user) throw new Error("User not found");

  let makeDefault = addressData.is_default === true;

  // If new address is default → unset all others
  if (makeDefault) {
    user.address.forEach(addr => {
      addr.is_default = false;
    });
  }

  user.address.push({
    location_name: addressData.location_name || null,
    contact_number: addressData.contact_number || null,
    address_line1: addressData.address_line1 || null,
    address_line2: addressData.address_line2 || null,
    city: addressData.city || null,
    state: addressData.state || null,
    pin_code: addressData.pin_code || null,
    is_default: makeDefault,
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
  const user = await User.findOne({ userId });
  if (!user) throw new Error("User not found");

  if (updateData.user_img && user.user_img) {
    const oldImagePath = path.join(
      process.cwd(),
      "uploads", 
      user.user_img
    );

    if (fs.existsSync(oldImagePath)) {
      fs.unlinkSync(oldImagePath);
    }
  }

  const updatedUser = await User.findOneAndUpdate(
    { userId },
    updateData,
    {
      new: true,
      runValidators: true,
    }
  );

  return updatedUser;
};


exports.updateUserStore = async (userId, storeId) => {
  const user = await User.findOne({ userId });
  if (!user) throw new Error("User not found");

  // If user has multiple stores — you can validate here
  // Example: if (!user.available_stores.includes(storeId)) throw new Error("Store not valid for this user")

  user.store = storeId; // save selected store
  await user.save();

  return user;
};

exports.updateAddress = async (userId, addressId, addressData) => {
  const user = await User.findOne({ userId });
  if (!user) throw new Error("User not found");

  // If setting this address as default → unset others
  if (addressData.is_default === true) {
    user.address.forEach(addr => {
      addr.is_default = false;
    });
    await user.save();
  }

  const updatedUser = await User.findOneAndUpdate(
    {
      userId,
      "address._id": addressId,
    },
    {
      $set: {
        "address.$.location_name": addressData.location_name,
        "address.$.contact_number": addressData.contact_number,
        "address.$.address_line1": addressData.address_line1,
        "address.$.address_line2": addressData.address_line2,
        "address.$.city": addressData.city,
        "address.$.state": addressData.state,
        "address.$.pin_code": addressData.pin_code,
        "address.$.is_default": addressData.is_default,
      },
    },
    { new: true }
  );

  if (!updatedUser) throw new Error("Address not found");

  return updatedUser;
};

exports.deleteAddress = async (userId, addressId) => {
  const updatedUser = await User.findOneAndUpdate(
    { userId },
    {
      $pull: {
        address: { _id: addressId },
      },
    },
    { new: true }
  );

  if (!updatedUser) throw new Error("User or address not found");

  return updatedUser;
};


exports.deleteUserById = async (userId) => {
  const deleted = await User.findOneAndDelete({ userId });
  if (!deleted) throw new Error("User not found");
  return deleted;
};
