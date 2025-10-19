const express = require("express");
const router = express.Router();
const UserController = require("../controller/User_Controller");

// ✅ Create a new user
router.post("/createuser", UserController.createUser);

// ✅ Update user by ID
router.put("/updateuserbyid/:userId", UserController.updateUserByUserId);
// ✅ Delete user by ID

router.delete("/deleteuserbyid/:userId", UserController.deleteUserById);

// ✅ Get all users
router.get("/getallusers", UserController.getAllUsers);

module.exports = router;
