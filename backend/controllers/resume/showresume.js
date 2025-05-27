const Resume = require("../../models/Resume");

const getResumeById = async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id)
                               .populate("userId", "fullname email")
                               .populate("employerId", "fullname company");
    
    if (!resume) return res.status(404).json({ message: "Resume not found" });

    res.status(200).json(resume);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

module.exports = { getResumeById };
