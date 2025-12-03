const multer = require("multer");
const path = require("path");
const fs = require("fs");

module.exports = (folderName) => {
  const uploadPath = path.join("uploads", folderName);

  // Create folder if missing
  if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
  }

  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
      const uniqueName = Date.now() + "-" + Math.round(Math.random() * 1e9);
      const ext = path.extname(file.originalname);
      cb(null, uniqueName + ext);
    },
  });

  const fileFilter = (req, file, cb) => {
    const allowed = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    if (!allowed.includes(file.mimetype)) {
      return cb(new Error("Only JPG, PNG, WEBP images allowed"), false);
    }
    cb(null, true);
  };

  return multer({
    storage,
    fileFilter,
  });
};
