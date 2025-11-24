const User = require("./User_Schema");
const userModel = require("./User_Schema");

exports.createUser = async (userdata) => {
  const { user_name, phone, email,store,created_by} = userdata;

  // Validate required fields
  if (!user_name || !phone || !email) {
    throw new Error("Name, phone, and email are required");
  }

  // Check duplicate
  const existingUser = await userModel.findOne({
    $or: [{ email }, { phone }],
  });

  if (existingUser) {
    throw new Error("User already exists with this email or phone number");
  }

  // Auto-generate userId
  const count = await userModel.countDocuments();
  const userId = `USR-${count + 1}`;

  // Create user including user_pic
  const newUser = new userModel({
    userId,
    user_name,
    phone,
    email,
    user_pic: "",  
    wallet_balance: 0,
    membership_type: "free",    
    created_by: created_by,      
    store: store,  
    status: "Active",
  });

  return await newUser.save();
};

exports.updateUserByUserId = async (userId, userdata) => {
  const updatedUser = await userModel.findOneAndUpdate(
    { userId },
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
