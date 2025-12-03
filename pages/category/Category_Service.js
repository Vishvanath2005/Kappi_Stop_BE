const Category = require("./Category_Schema.js");
const fs = require("fs");

exports.createCategory = async (data) => {
  let { category_name, category_img, type } = data;

  // Normalize type to always be an array
  if (!type) {
    type = [];
  }

  // If type is a string (from frontend), convert to array
  if (typeof type === "string") {
    type = type.split(",").map(item => item.trim());
  }

  // 🔥 Remove empty strings
  type = type.filter(item => item !== "");

  // If only empty values existed → type becomes []
  if (type.length === 0) {
    type = [];
  }

  const exists = await Category.findOne({ category_name });
  if (exists) {
    throw new Error("Category already exists");
  }

  const newCategory = new Category({
    category_name,
    category_img,
    type,
  });

  return await newCategory.save();
};


exports.getAllCategory = async () => {
  return await Category.find();
};

exports.getCategoryById = async (id) => {
  const category = await Category.findById(id);
  if (!category) throw new Error("Category not found");
  return category;
};

exports.updateCategory = async (id, data) => {
  const category = await Category.findById(id);
  if (!category) throw new Error("Category not found");

  if (data.category_img && category.category_img) {
    const localPath = category.category_img.replace(/^.+\/uploads/, "uploads");
    if (fs.existsSync(localPath)) {
      fs.unlinkSync(localPath);
    }
  }

  const updated = await Category.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });

  return updated;
};

exports.deleteCategory = async (id) => {
  const deleted = await Category.findByIdAndDelete(id);
  if (!deleted) throw new Error("Category not found");

  if (deleted.category_img) {
    const localPath = deleted.category_img.replace(/^.+\/uploads/, "uploads");
    if (fs.existsSync(localPath)) fs.unlinkSync(localPath);
  }

  return deleted;
};