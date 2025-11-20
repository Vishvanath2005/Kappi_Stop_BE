const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Dynamic upload function — makes it reusable
const makeUploader = (folderName) => {
  const uploadPath = path.join(process.cwd(), "uploads", folderName);

  // Ensure folder exists
  if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
  }

  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
      cb(
        null,
        Date.now() +
          "-" +
          Math.round(Math.random() * 1e9) +
          path.extname(file.originalname)
      );
    },
  });

  const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) cb(null, true);
    else cb(new Error("Only image files are allowed"), false);
  };

  return multer({ storage, fileFilter });
};

module.exports = makeUploader;
