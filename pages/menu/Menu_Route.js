const express = require("express");
const router = express.Router();
const MenuController = require("./Menu_Controller");
const uploadMenuImage = require("../../middleware/Upload")("menu_items");

router.post(
  "/createmenu",
  uploadMenuImage.single("product_img"),
  MenuController.createMenu
);
router.get("/getallmenu", MenuController.getAllMenu);
router.get("/getmenu/:productId", MenuController.getMenuById);
router.get("/store/:storeId", MenuController.getMenuByFilters);
router.get(
  "/store/:storeId/category/:category",
  MenuController.getMenuByFilters
);
router.get(
  "/store/:storeId/category/:category/type/:type",
  MenuController.getMenuByFilters
);
router.put(
  "/updatemenu/:productId",
  uploadMenuImage.single("product_img"),
  MenuController.updateMenuById
);
router.delete("/deletemenu/:productId", MenuController.deleteMenuById);

module.exports = router;
