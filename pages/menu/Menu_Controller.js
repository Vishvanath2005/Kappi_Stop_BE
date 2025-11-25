const menuService = require("./Menu_Service");

exports.createMenu = async (req, res) => {
  try {
    const menuData = req.body;

    if (req.file) {
      menuData.product_img = `${req.protocol}://${req.get("host")}/uploads/menu_items/${req.file.filename}`;
    }

    const newMenu = await menuService.createMenu(menuData);

    res.status(201).json({
      success: true,
      message: "Menu item created successfully",
      data: newMenu,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message || "Failed to create menu item",
    });
  }
};


exports.getAllMenu = async (req, res) => {
  try {
    const menuList = await menuService.getAllMenu();

    res.status(200).json({
      success: true,
      count: menuList.length,
      data: menuList,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getMenuByFilters = async (req, res) => {
  try {
    const { storeId, category, type } = req.params;

    const menuList = await menuService.getMenuByFilters(
      storeId,
      category,
      type
    );

    res.status(200).json({
      success: true,
      count: menuList.length,
      data: menuList,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getCategoriesByStore = async (req, res) => {
  try {
    const { storeId } = req.params;

    const categories = await menuService.getCategoriesByStore(storeId);

    res.status(200).json({
      success: true,
      count: categories.length,
      categories,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getMenuById = async (req, res) => {
  try {
    const { productId } = req.params;
    const menu = await menuService.getMenuById(productId);

    res.status(200).json({
      success: true,
      data: menu,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message || "Menu item not found",
    });
  }
};

exports.updateMenuById = async (req, res) => {
  try {
    const { productId } = req.params;
    const updatedData = req.body;

    if (req.file) {
      updatedData.product_img = req.file.path;
    }

    const updatedMenu = await menuService.updateMenuById(
      productId,
      updatedData
    );

    res.status(200).json({
      success: true,
      message: "Menu item updated successfully",
      data: updatedMenu,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message || "Failed to update menu item",
    });
  }
};

exports.deleteMenuById = async (req, res) => {
  try {
    const { productId } = req.params;
    const deletedMenu = await menuService.deleteMenuById(productId);

    res.status(200).json({
      success: true,
      message: "Menu item deleted successfully",
      data: deletedMenu,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message || "Failed to delete menu item",
    });
  }
};
