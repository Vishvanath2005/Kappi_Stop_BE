const UserService = require("./User_Service");

exports.createUser = async (req, res) => {
  try {
    const { phone } = req.body;

    if (!phone) {
      return res.status(400).json({ message: "Phone is required" });
    }

    const user = await UserService.createUser({
      phone
    });

    res.status(201).json({
      message: "User created / fetched successfully",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error creating user",
      error: error.message,
    });
  }
};

exports.updateCurrentLocation = async (req, res) => {
  try {
    const { userId } = req.params;
    const { latitude, longitude } = req.body;

    if (latitude == null || longitude == null) {
      return res
        .status(400)
        .json({ message: "latitude and longitude are required" });
    }

    const updatedUser = await UserService.updateCurrentLocation(
      userId,
      latitude,
      longitude
    );

    res.status(200).json({
      message: "Current location updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error updating location",
      error: error.message,
    });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { phone, current_location } = req.body;

    if (!phone) {
      return res.status(400).json({ message: "Phone is required" });
    }

    let user = await UserService.getUserByPhone(phone);

    if (!user) {
      user = await UserService.createUser({
        phone,
        current_location,
      });
    }

    let updatedUser = user;

    if (current_location?.latitude && current_location?.longitude) {
      updatedUser = await UserService.updateLocationAndAssignStore(
        user.userId,
        current_location.latitude,
        current_location.longitude
      );
    }

    res.status(200).json({
      message: "Login successful",
      data: updatedUser,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error logging in",
      error: error.message,
    });
  }
};

exports.addAddress = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await UserService.addAddress(userId, req.body);
    res.status(200).json({
      message: "Address added successfully",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error adding address",
      error: error.message,
    });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await UserService.getAllUsers();
    res.status(200).json({
      message: "Users retrieved successfully",
      count: users.length,
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching users",
      error: error.message,
    });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await UserService.getUserById(userId);
    res.status(200).json({
      message: "User retrieved successfully",
      data: user,
    });
  } catch (error) {
    res.status(404).json({
      message: "User not found",
      error: error.message,
    });
  }
};

exports.updateUserById = async (req, res) => {
  try {
    const { userId } = req.params;
    const updatedUser = await UserService.updateUserById(userId, req.body);
    res.status(200).json({
      message: "User updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error updating user",
      error: error.message,
    });
  }
};

exports.deleteUserById = async (req, res) => {
  try {
    const { userId } = req.params;
    const deletedUser = await UserService.deleteUserById(userId);
    res.status(200).json({
      message: "User deleted successfully",
      data: deletedUser,
    });
  } catch (error) {
    res.status(404).json({
      message: "User not found",
      error: error.message,
    });
  }
};