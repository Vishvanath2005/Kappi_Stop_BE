const express = require("express");
const router = express.Router();
const UserController = require("./User_Controller");
const upload = require("../../middleware/Upload.js")();

router.post("/createuser", UserController.createUser);
router.post("/:userId/current_location", UserController.updateCurrentLocation);
router.post("/login", UserController.loginUser);
router.post("/:userId/address", UserController.addAddress);

router.get("/all", UserController.getAllUsers);
router.get("/:userId", UserController.getUserById);

router.put(
  "/update/:userId",
  upload.single("user_img"),
  UserController.updateUserById
);
router.put("/:userId/select_store", UserController.selectUserStore);

router.put("/:userId/address/:addressId", UserController.updateAddress);

router.delete("/:userId/address/:addressId", UserController.deleteAddress);

router.delete("/delete/:userId", UserController.deleteUserById);
module.exports = router;
