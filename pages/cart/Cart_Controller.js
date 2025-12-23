const cartService = require("./Cart_Service");

exports.getCart = async (req, res) => {
  try {
    const { userId } = req.params;
    const cart = await cartService.getCartByUser(userId);

    res.status(200).json({ success: true, data: cart });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.addToCart = async (req, res) => {
  try {
    const { userId } = req.params;
    const cart = await cartService.addItemToCart(userId, req.body);

    res.status(200).json({
      success: true,
      message: "Item added to cart",
      data: cart,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

exports.updatePayment = async (req, res) => {
  try {
    const { orderId } = req.params;

    const cart = await cartService.updateCartPayment(orderId, req.body);

    res.status(200).json({
      success: true,
      message: "Payment details updated successfully",
      data: cart,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};


exports.removeFromCart = async (req, res) => {
  try {
    const { userId, productId } = req.params;
    const cart = await cartService.removeItemFromCart(userId, productId);

    res.status(200).json({
      success: true,
      message: "Item removed from cart",
      data: cart,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.clearCart = async (req, res) => {
  try {
    const { userId } = req.params;
    const cart = await cartService.clearCart(userId);

    res.status(200).json({
      success: true,
      message: "Cart cleared",
      data: cart,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
