const UserService = require("./User_Service");

exports.createUser = async (req, res) => {
  try {
    const body = req.body;

    const address = {
      home: {
        address_name: body?.address?.home?.address_name || null,
        latitude: body?.address?.home?.latitude || null,
        longitude: body?.address?.home?.longitude || null,
      },
      work: {
        address_name: body?.address?.work?.address_name || null,
        latitude: body?.address?.work?.latitude || null,
        longitude: body?.address?.work?.longitude || null,
      },
    };

    const userPayload = {
      ...body,
      address,
    };

    const newUser = await UserService.createUser(userPayload);

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


exports.addHomeAddress = async (req, res) => {
  try {
    const { userId } = req.params;

    const updatedUser = await UserService.addHomeAddress(userId, req.body);

    return res.status(200).json({
      message: "Home Address Updated Successfully",
      data: updatedUser,
    });
  } catch (error) {
    if (error.message === "User not found") {
      return res.status(404).json({ message: "User Not Found" });
    }

    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};


exports.addWorkAddress = async (req, res) => {
  try {
    const { userId } = req.params;

    const updatedUser = await UserService.addWorkAddress(userId, req.body);

    return res.status(200).json({
      message: "Work Address Updated Successfully",
      data: updatedUser,
    });
  } catch (error) {
    if (error.message === "User not found") {
      return res.status(404).json({ message: "User Not Found" });
    }

    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

exports.updateUserByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    const body = req.body;
    let updateData = { ...body };

    if (body.address) {
      updateData.address = {
        home: {
          address_name: body?.address?.home?.address_name,
          latitude: body?.address?.home?.latitude,
          longitude: body?.address?.home?.longitude,
        },
        work: {
          address_name: body?.address?.work?.address_name,
          latitude: body?.address?.work?.latitude,
          longitude: body?.address?.work?.longitude,
        },
      };
    }

    const updatedUser = await UserService.updateUserByUserId(
      userId,
      updateData
    );

    res.status(200).json({
      message: "User Updated Successfully",
      data: updatedUser,
    });
  } catch (error) {
    if (error.message === "User not found") {
      return res.status(404).json({ message: "User Not Found" });
    }

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
      return res.status(404).json({ message: "User Not Found" });
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
