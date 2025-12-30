const express = require("express");
const router = express.Router();
const controller = require("./Transaction_Controller");

router.post("/", controller.createTransaction);
router.get("/user/:userId", controller.getTransactionsByUser);
router.get("/:id", controller.getTransactionById);

module.exports = router;
