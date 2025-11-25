const User = require("./User_Schema");
const userModel = require("./User_Schema");

exports.createUser = async (userdata) => {
  const { phone } = userdata;

  if (!phone) {
    throw new Error("Phone number is required");
  }

  let existingUser = await userModel.findOne({ phone });
  if (existingUser) {
    return existingUser;
  }

  const count = await userModel.countDocuments();
  const userId = `USR-${count + 1}`;

  const newUser = new userModel({
    userId,
    phone,
    user_name: userdata.user_name || "Guest User",
    email: userdata.email || `user${Date.now()}@example.com`,
    store: userdata.store || null,

    wallet_balance: 0,
    membership_type: "Standard",
    status: "Active",

    address: {
      home: {
        address_name: userdata?.address?.home?.address_name || null,
        latitude: userdata?.address?.home?.latitude || null,
        longitude: userdata?.address?.home?.longitude || null,
      },
      work: {
        address_name: userdata?.address?.work?.address_name || null,
        latitude: userdata?.address?.work?.latitude || null,
        longitude: userdata?.address?.work?.longitude || null,
      },
    },
  });

  return await newUser.save();
};

exports.addHomeAddress = async (userId, addressData) => {
  const user = await userModel.findOne({ userId });

  if (!user) {
    throw new Error("User not found");
  }

  user.address.home = {
    address_name: addressData.address_name || null,
    latitude: addressData.latitude || null,
    longitude: addressData.longitude || null,
  };

  await user.save();
  return user;
};

exports.addWorkAddress = async (userId, addressData) => {
  const user = await userModel.findOne({ userId });

  if (!user) {
    throw new Error("User not found");
  }

  user.address.work = {
    address_name: addressData.address_name || null,
    latitude: addressData.latitude || null,
    longitude: addressData.longitude || null,
  };

  await user.save();
  return user;
};

exports.updateUserByUserId = async (userId, userdata) => {
  const updatedUser = await userModel.findOneAndUpdate({ userId }, userdata, {
    new: true,
    runValidators: true,
  });

  if (!updatedUser) {
    throw new Error("User not found");
  }

  return updatedUser;
};

exports.deleteUserByUserId = async (userId) => {
  const deletedUser = await userModel.findOneAndDelete({ userId });

  if (!deletedUser) {
    throw new Error("User not found");
  }

  return deletedUser;
};

exports.getAllUsers = async () => {
  return await userModel
    .find()
    .select(
      "userId name phone email wallet_balance membership_type role status"
    );
};
