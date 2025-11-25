const express = require("express");
const router = express.Router();
const UserController = require("./User_Controller");

router.post("/createuser", UserController.createUser);
router.post("/:userId/address/home", UserController.addHomeAddress);
router.post("/:userId/address/work", UserController.addWorkAddress);
router.put("/updateuserbyid/:userId", UserController.updateUserByUserId);
router.delete("/deleteuserbyid/:userId", UserController.deleteUserById);
router.get("/getallusers", UserController.getAllUsers);

module.exports = router;
