const express = require("express");
const router = express.Router();
const MenuController = require("./Menu_Controller");
const upload = require("../../middleware/upload")("menu");

router.post(
  "/createmenu",
  upload.single("product_img"),
  MenuController.createMenu
);
router.get("/getallmenu", MenuController.getAllMenu);
router.get("/getmenu/:productId", MenuController.getMenuById);
router.get("/store/:storeId", MenuController.getMenuByFilters);
router.get("/store/:storeId/categories", MenuController.getCategoriesByStore);

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
  upload.single("product_img"),
  MenuController.updateMenuById
);


router.delete("/deletemenu/:productId", MenuController.deleteMenuById);

module.exports = router;
