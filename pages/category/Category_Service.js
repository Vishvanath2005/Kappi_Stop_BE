const Category = require("./Category_Schema.js");

exports.createCategory = async (data) => {
  const { category_name, category_img, type } = data;

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
  const updated = await Category.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });

  if (!updated) throw new Error("Category not found");
  return updated;
};

exports.deleteCategory = async (id) => {
  const deleted = await Category.findByIdAndDelete(id);
  if (!deleted) throw new Error("Category not found");
  return deleted;
};
