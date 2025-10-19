const express = require("express");
const router = express.Router();
const StoreController = require("../controller/Store_Controller.js");

router.post("/createstore", StoreController.createStore);
router.get("/getallstores", StoreController.getAllStores);
router.get("/getstore/:storeId", StoreController.getStoreById);
router.put("/updatestore/:storeId", StoreController.updateStoreById);
router.delete("/deletestore/:storeId", StoreController.deleteStoreById);

module.exports = router;
