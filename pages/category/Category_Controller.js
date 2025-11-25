const categoryService = require("./Category_Service");

exports.createCategory = async (req, res) => {
  try {
    const data = req.body;

    // Parse JSON array sent from FormData
    if (data.type) {
      data.type = JSON.parse(data.type);
    }

    // Save uploaded image
    if (req.file) {
      data.category_img = `${req.protocol}://${req.get(
        "host"
      )}/uploads/category/${req.file.filename}`;
    }

    const newCategory = await categoryService.createCategory(data);

    res.status(201).json({
      success: true,
      message: "Category created successfully",
      data: newCategory,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.getAllCategory = async (req, res) => {
  try {
    const categories = await categoryService.getAllCategory();
    res.status(200).json({ success: true, data: categories });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getCategoryById = async (req, res) => {
  try {
    const category = await categoryService.getCategoryById(req.params.id);
    res.status(200).json({ success: true, data: category });
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const data = req.body;

    // Parse JSON
    if (data.type) {
      data.type = JSON.parse(data.type);
    }

    // If image updated
    if (req.file) {
      data.category_img = `${req.protocol}://${req.get(
        "host"
      )}/uploads/category/${req.file.filename}`;
    }

    const updated = await categoryService.updateCategory(req.params.id, data);

    res.status(200).json({
      success: true,
      message: "Category updated successfully",
      data: updated,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const deleted = await categoryService.deleteCategory(req.params.id);
    res.status(200).json({
      success: true,
      message: "Category deleted successfully",
      data: deleted,
    });
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
};
