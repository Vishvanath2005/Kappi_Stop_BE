const Cart = require("./Cart_Model");
const Menu = require("../menu/Menu_Schema");
const User = require("../user/User_Schema"); 

exports.getCartByUser = async (userId) => {
  return await Cart.findOne({ userId, order_status: "Cart" });
};

exports.addItemToCart = async (userId, payload) => {
  const {
    productId,
    count,
    order_note,
    payment_type,
    payment_status,
    transaction_id,
  } = payload;

  if (!productId) {
    throw new Error("productId is required");
  }

  const finalCount = count === undefined ? 1 : Number(count);
  if (Number.isNaN(finalCount) || finalCount <= 0) {
    throw new Error("Invalid count");
  }

  const product = await Menu.findOne({ productId });
  if (!product) {
    throw new Error("Product not found");
  }

  const { product_name, product_img, price, available_store } = product;
  const storeId = available_store?.[0] || null;

  let cart = await Cart.findOne({ userId, order_status: "Cart" });

  if (!cart) {
    const lastOrder = await Cart.findOne(
      { orderId: { $regex: /^ORD-\d+$/ } },
      { orderId: 1 }
    ).sort({ createdAt: -1 });

    const nextOrderNumber = lastOrder?.orderId
      ? parseInt(lastOrder.orderId.split("-")[1], 10) + 1
      : 1;

    cart = new Cart({
      userId,
      orderId: `ORD-${nextOrderNumber}`,
      order_status: "Cart",
      storeId,

      payment_type: null,
      payment_status: null,
      transaction_id: null,
    });
  }

  if (!cart.address) {
    const user = await User.findOne({ userId }).lean();

    if (user && Array.isArray(user.address)) {
      const defaultAddress = user.address.find(
        (addr) => addr.is_default === true
      );

      if (defaultAddress) {
        cart.address = [
          defaultAddress.address_line1,
          defaultAddress.address_line2,
          defaultAddress.city,
          defaultAddress.state,
          defaultAddress.pin_code,
        ]
          .filter(Boolean)
          .join(", ");
      }
    }
  }

  const existingItem = cart.order_details.find(
    (item) => item.productId === productId
  );

  if (existingItem) {
    existingItem.count = finalCount;
    existingItem.total = existingItem.price * finalCount;
  } else {
    cart.order_details.push({
      productId,
      product_name,
      product_img,
      price,
      count: finalCount,
      total: price * finalCount,
    });
  }

  if (order_note !== undefined) {
    cart.order_note = order_note;
  }

  if (payment_type !== undefined) {
    cart.payment_type = payment_type;
  }

  if (payment_status !== undefined) {
    cart.payment_status = payment_status;
  }

  if (transaction_id !== undefined) {
    cart.transaction_id = transaction_id;
  }

  cart.sub_total_amount = cart.order_details.reduce(
    (sum, item) => sum + item.total,
    0
  );

  cart.grand_total = cart.sub_total_amount - (cart.discount || 0);

  await cart.save();
  return cart;
};

exports.updateCartPayment = async (orderId, payload) => {
  const { payment_type, payment_status, transaction_id } = payload;

  const cart = await Cart.findOne({ orderId, order_status: "Cart" });
  if (!cart) {
    throw new Error("Active cart not found");
  }

  if (payment_type !== undefined) cart.payment_type = payment_type;
  if (payment_status !== undefined) cart.payment_status = payment_status;
  if (transaction_id !== undefined) cart.transaction_id = transaction_id;

  await cart.save();
  return cart;
};

exports.removeItemFromCart = async (userId, productId) => {
  const cart = await Cart.findOne({ userId, order_status: "Cart" });
  if (!cart) throw new Error("Cart not found");

  cart.order_details = cart.order_details.filter(
    (item) => item.productId !== productId
  );

  cart.sub_total_amount = cart.order_details.reduce(
    (sum, item) => sum + item.total,
    0
  );

  cart.grand_total = cart.sub_total_amount - (cart.discount || 0);

  await cart.save();
  return cart;
};

exports.clearCart = async (userId) => {
  return await Cart.findOneAndUpdate(
    { userId, order_status: "Cart" },
    {
      order_details: [],
      sub_total_amount: 0,
      discount: 0,
      grand_total: 0,
    },
    { new: true }
  );
};
