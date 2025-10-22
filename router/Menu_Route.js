const express = require("express");
const router = express.Router();
const MenuController = require("../controller/Menu_Controller.js");

router.post("/createmenu", MenuController.createMenu);
router.get("/getallmenu", MenuController.getAllMenu);
router.get("/getmenu/:productId", MenuController.getMenuById);
router.put("/updatemenu/:productId", MenuController.updateMenuById);
router.delete("/deletemenu/:productId", MenuController.deleteMenuById);

module.exports = router;
