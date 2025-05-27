const Resume = require("../../models/Resume");

const uploadResume = async (req, res) => {
  try {
    const { userId, employerId } = req.body;

    if (!req.file || !req.file.path) {
      return res.status(400).json({ message: "Resume file is required" });
    }

    const newResume = new Resume({
      userId,
      employerId,
      resumeUrl: req.file.path,
    });

    await newResume.save();
    res.status(201).json({ message: "Resume uploaded successfully", data: newResume });

  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

module.exports = { uploadResume };
