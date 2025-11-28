const express = require("express");
const router = express.Router();
const UserController = require("./User_Controller");

router.post("/createuser", UserController.createUser);
router.post("/:userId/current_location", UserController.updateCurrentLocation);
router.post("/login", UserController.loginUser);
router.post("/:userId/address", UserController.addAddress);

router.get("/all", UserController.getAllUsers);
router.get("/:userId", UserController.getUserById);

router.put("/update/:userId", UserController.updateUserById);

router.delete("/delete/:userId", UserController.deleteUserById);
module.exports = router;
