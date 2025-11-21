const multer = require("multer");

const makeUploader = () => {
  const storage = multer.memoryStorage(); 

  const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) cb(null, true);
    else cb(new Error("Only image files are allowed"), false);
  };

  return multer({ storage, fileFilter });
};

module.exports = makeUploader;
