const express = require("express");
const router = express.Router();
const { uploadResume } = require("../controllers/resume/uploadResume");
const upload = require("../middleware/cloudinaryStorage"); 

router.post("/upload", upload.single("resume"), uploadResume);

module.exports = router;
