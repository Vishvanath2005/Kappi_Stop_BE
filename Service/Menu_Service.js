const Menu = require("../model/Menu_Schema");

exports.createMenu = async (menuData) => {
  const { product_name, category, price, add_ons, status } = menuData;

  const count = await Menu.countDocuments();
  const productId = `PRO-${count + 1}`;

  const existingProduct = await Menu.findOne({ product_name });
  if (existingProduct) {
    throw new Error("Menu item already exists with this name");
  }

  const newMenu = new Menu({
    productId,
    product_name,
    category: category || "Uncategorized",
    price: price || 0,
    add_ons: add_ons || [],
    last_updated: new Date(),
    status: status || "available",
  });

  return await newMenu.save();
};

exports.getAllMenu = async () => {
  return await Menu.find().select(
    "productId product_name category price add_ons last_updated status"
  );
};

exports.getMenuById = async (productId) => {
  const menu = await Menu.findOne({ productId });
  if (!menu) {
    throw new Error("Menu item not found");
  }
  return menu;
};

exports.updateMenuById = async (productId, menuData) => {
  menuData.last_updated = new Date(); // update timestamp

  const updatedMenu = await Menu.findOneAndUpdate({ productId }, menuData, {
    new: true,
    runValidators: true,
  });

  if (!updatedMenu) {
    throw new Error("Menu item not found");
  }

  return updatedMenu;
};

exports.deleteMenuById = async (productId) => {
  const deletedMenu = await Menu.findOneAndDelete({ productId });
  if (!deletedMenu) {
    throw new Error("Menu item not found");
  }
  return deletedMenu;
};
