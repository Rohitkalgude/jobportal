const mongoose = require("mongoose");
const Application = require("../../models/Application");
const Job = require("../../models/Job");

const getUserApplications = async (req, res) => {
  try {
    const { applicantId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(applicantId)) {
      return res.status(400).json({ message: "Invalid applicant ID format" });
    }

    console.log("Fetching applications for applicantId:", applicantId);

    const applications = await Application.find({ applicant: applicantId })
      .populate("job", "title company location")
      .populate("applicant", "name email");

    if (!applications || applications.length === 0) {
      return res.status(404).json({ message: "No job applications found." });
    }

    res.status(200).json(applications);
  } catch (error) {
    console.error("Error fetching user applications:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = getUserApplications;
