const userModel = require("../Model/User_Schema");

// ✅ Create a new user
exports.createUser = async (userdata) => {
  const {
    userId,
    name,
    phone,
    email,
    wallet_balance,
    membership_type,
    status,
  } = userdata;

  // ✅ Check if email or phone already exists
  const existingUser = await userModel.findOne({
    $or: [{ email }, { phone }],
  });

  if (existingUser) {
    throw new Error("User already exists with this email or phone number");
  }

  // ✅ Create and save the new user
  const newUser = new userModel({
    userId,
    name,
    phone,
    email,
    wallet_balance: wallet_balance || 0, // default to 0 if not provided
    membership_type: membership_type || "free",
    status: status || "active",
  });

  return await newUser.save();
};

// ✅ Update user by userId
exports.updateUserByUserId = async (userId, userdata) => {
  const updatedUser = await userModel.findOneAndUpdate(
    { userId }, // query by userId
    userdata,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!updatedUser) {
    throw new Error("User not found");
  }

  return updatedUser;
};

// ✅ Delete user by userId
exports.deleteUserByUserId = async (userId) => {
  const deletedUser = await userModel.findOneAndDelete({ userId });

  if (!deletedUser) {
    throw new Error("User not found");
  }

  return deletedUser;
};

// ✅ Get all users
exports.getAllUsers = async () => {
  return await userModel
    .find()
    .select(
      "userId name phone email wallet_balance membership_type role status"
    );
};
