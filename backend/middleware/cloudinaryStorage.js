const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "resumes",
    format: async (req, file) => "pdf", // force PDF format
    public_id: (req, file) => `${Date.now()}-${file.originalname}`,
    resource_type: "raw", // Required for PDF or non-image files
  },
});

const upload = multer({ storage });

module.exports = upload;
