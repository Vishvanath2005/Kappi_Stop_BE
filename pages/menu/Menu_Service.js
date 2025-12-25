const Menu = require("./Menu_Schema");
const Category = require("../category/Category_Schema");
const fs = require("fs");

exports.createMenu = async (menuData) => {
  const {
    product_name,
    product_img,
    category,
    description,
    price,
    available_store,
    type,
    status,
  } = menuData;

  const count = await Menu.countDocuments();
  const productId = `PRO-${count + 1}`;

  const existingProduct = await Menu.findOne({ product_name });
  if (existingProduct) {
    throw new Error("Menu item already exists with this name");
  }

  const newMenu = new Menu({
    productId,
    product_name,
    product_img,
    available_store,
    description,
    type: type || "none",
    category,
    price: price || 0,
    last_updated: new Date(),
    status: status || "Available",
  });

  return await newMenu.save();
};

exports.updateMenuById = async (productId, data) => {
  const menu = await Menu.findOne({ productId });
  if (!menu) throw new Error("Menu item not found");

  if (data.product_img && menu.product_img) {
    const oldImagePath = `uploads/menu/${menu.product_img}`;
    if (fs.existsSync(oldImagePath)) {
      fs.unlinkSync(oldImagePath);
    }
  }

  return await Menu.findOneAndUpdate(
    { productId },
    data,
    { new: true, runValidators: true }
  );
};

exports.getAllMenu = async () => {
  return await Menu.find().select(
    "productId product_name description product_img category price available_store type last_updated status"
  );
};


exports.getCategoriesByStore = async (storeId) => {
  const menuList = await Menu.find({ available_store: storeId }).select(
    "category"
  );

  const categoryNames = [...new Set(menuList.map((item) => item.category))];

  const categories = await Category.find({
    category_name: { $in: categoryNames },
  }).select("category_name category_img ");

  return categories;
};

exports.getMenuByFilters = async (storeId, category, type) => {
  const query = {};

  if (storeId) {
    query.available_store = { $regex: storeId }; 
  }

  if (category) {
    query.category = category;
  }

  if (type) {
    query.type = type;
  }

  return await Menu.find(query).select(
    "productId product_name description product_img category price type last_updated status available_store"
  );
};


exports.getMenuById = async (productId) => {
  const menu = await Menu.findOne({ productId });
  if (!menu) {
    throw new Error("Menu item not found");
  }
  return menu;
};

exports.deleteMenuById = async (productId) => {
  const deletedMenu = await Menu.findOneAndDelete({ productId });
  if (!deletedMenu) {
    throw new Error("Menu item not found");
  }
  return deletedMenu;
};
