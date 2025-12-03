const express = require("express");
const router = express.Router();
const CategoryController = require("./Category_Controller");
const uploadCategoryImage = require("../../middleware/upload")("category");

router.post(
  "/createcategory",
  uploadCategoryImage.single("category_img"),
  CategoryController.createCategory
);

router.get("/getallcategory", CategoryController.getAllCategory);
router.get("/getcategory/:id", CategoryController.getCategoryById);

router.put(
  "/updatecategory/:id",
  uploadCategoryImage.single("category_img"),
  CategoryController.updateCategory
);

router.delete("/deletecategory/:id", CategoryController.deleteCategory);

module.exports = router;
