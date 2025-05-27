const express = require("express");
const upload = require("../middleware/uploadMiddleware");
const { uploadResume } = require("../controllers/resume/uploadResume");
const { getResumeById } = require("../controllers/resume/showresume");

const router = express.Router();

router.post("/upload", upload.single("resume"), uploadResume);
router.get("/:id", getResumeById);

module.exports = router;
