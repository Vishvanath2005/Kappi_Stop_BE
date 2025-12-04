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
    add_ons,
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
    category: category,
    price: price || 0,
    add_ons: add_ons || [],
    last_updated: new Date(),
    status: status || "Available",
  });

  return await newMenu.save();
};

exports.updateUserById = async (userId, updateData) => {
  const user = await User.findOne({ userId });
  if (!user) throw new Error("User not found");

  // If a new image is uploaded
  if (updateData.user_img) {
    const oldImage = user.user_img;

    if (oldImage) {
      const oldImagePath = `uploads/users/${oldImage}`;
      const newImagePath = `uploads/users/${updateData.user_img}`;

      // Remove the old image if it exists
      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
      }

      if (fs.existsSync(newImagePath)) {
        fs.renameSync(newImagePath, oldImagePath);
      }

      updateData.user_img = oldImage;
    }
  }

  // Update the user
  const updatedUser = await User.findOneAndUpdate({ userId }, updateData, {
    new: true,
    runValidators: true,
  });

  return updatedUser;
};

exports.getAllMenu = async () => {
  return await Menu.find().select(
    "productId product_name description product_img category price add_ons available_store type last_updated status"
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

  if (storeId) query.available_store = storeId;
  if (category) query.category = category;
  if (type) query.type = type;

  return await Menu.find(query).select(
    "productId product_name  description product_img category price add_ons type last_updated status"
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
