const mongoose = require("mongoose");
const Application = require("../../models/Application");
const Job = require("../../models/Job");

const applyJob = async (req, res) => {
  try {
    const {
      jobId,
      applicantId,
      fullname,
      email,
      city,
      mobileNumber,
      workstatus,
      education,
      skills,
      experience
    } = req.body;

    // ✅ Validate required fields
    if (!jobId || !applicantId || !fullname || !email || !city || !mobileNumber || !workstatus || !education || !skills ||!experience) {
      return res.status(400).json({ message: "All fields are required." });
    }

    if (!mongoose.Types.ObjectId.isValid(jobId) || !mongoose.Types.ObjectId.isValid(applicantId)) {
      return res.status(400).json({ message: "Invalid job or applicant ID format" });
    }

    const jobExists = await Job.findById(jobId);
    if (!jobExists) return res.status(404).json({ message: "Job not found." });

    const existingApplication = await Application.findOne({ job: jobId, applicant: applicantId });
    if (existingApplication) {
      return res.status(400).json({ message: "You have already applied for this job." });
    }

    const application = new Application({
      job: jobId,
      applicant: applicantId,
      jobTitle: jobExists.title,
      companyName: jobExists.companyname,
      fullname,
      email,
      city,
      mobileNumber,
      workstatus,
      education: Array.isArray(education) ? education : education.split(",").map((e) => e.trim()),
      skills: Array.isArray(skills) ? skills : skills.split(",").map((s) => s.trim()),
      experience: Array.isArray(experience) ? experience : experience.split(",").map((s) => s.trim()),
    });

    await application.save();

    res.status(201).json({ message: "Application submitted successfully." });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = applyJob;
