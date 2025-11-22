const User = require("./User_Schema");
const userModel = require("./User_Schema");

exports.createUser = async (userdata) => {
  const {
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

  const count = await User.countDocuments();
  const userId = `USR-${count + 1}`;
 
  const newUser = new userModel({
    userId,
    name,
    phone,
    email,
    wallet_balance: wallet_balance || 0, 
    membership_type: membership_type || "free",
    status: status || "Active",
  });

  return await newUser.save();
};

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
