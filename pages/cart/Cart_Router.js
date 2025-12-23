const express = require("express");
const router = express.Router();
const CartController = require("./Cart_Controller");

router.get("/:userId", CartController.getCart);
router.post("/:userId/add", CartController.addToCart);
router.put("/:orderId/payment", CartController.updatePayment);
router.delete("/:userId/remove/:productId", CartController.removeFromCart);
router.delete("/:userId/clear", CartController.clearCart);

module.exports = router;
