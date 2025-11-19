const UserService = require ('./User_Service')

exports.createUser = async (req, res) => {
  try {
    const newUser = await UserService.createUser(req.body);
    res.status(201).json({
      message: "User Created Successfully",
      data: newUser,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

exports.updateUserByUserId = async (req, res) => {
  try {
    const { userId } = req.params;

    const updatedUser = await UserService.updateUserByUserId(userId, req.body);

    res.status(200).json({
      message: "User Updated Successfully",
      data: updatedUser,
    });
  } catch (error) {
    if (error.message === "User not found") {
      // 404 if the user doesn't exist
      return res.status(404).json({
        message: "User Not Found",
      });
    }

    // 500 for any other server errors
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

exports.deleteUserById = async (req, res) => {
  try {
    const { userId } = req.params;
    const deletedUser = await UserService.deleteUserByUserId(userId);

    if (!deletedUser) {
      return res.status(404).json({
        message: "User Not Found",
      });
    }

    res.status(200).json({
      message: "User Deleted Successfully",
      data: deletedUser,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await UserService.getAllUsers();
    res.status(200).json({
      message: "Users Retrieved Successfully",
      count: users.length,
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
