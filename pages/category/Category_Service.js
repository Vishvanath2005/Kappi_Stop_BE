const Category = require("./Category_Schema.js");
const fs = require("fs");

exports.createCategory = async (data) => {
  let { category_name, category_img, type } = data;

  if (!type) {
    type = [];
  }

  if (typeof type === "string") {
    type = type.split(",").map(item => item.trim());
  }

  type = type.filter(item => item !== "");

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

  // If a new image was uploaded
  if (data.category_img) {
    const oldImage = category.category_img;

    if (oldImage) {
      const oldImagePath = `uploads/category/${oldImage}`;

      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);  
      }
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