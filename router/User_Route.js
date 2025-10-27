const express = require("express");
const router = express.Router();
const UserController = require("../controller/User_Controller");

router.post("/createuser", UserController.createUser);
router.put("/updateuserbyid/:userId", UserController.updateUserByUserId);
router.delete("/deleteuserbyid/:userId", UserController.deleteUserById);
router.get("/getallusers", UserController.getAllUsers);

module.exports = router;
