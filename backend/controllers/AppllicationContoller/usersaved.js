const mongoose = require("mongoose");
const Application = require("../../models/Application");

const getUserApplications = async (req, res) => {
  try {
    const { applicantId } = req.params;

    // Validate applicantId
    if (!mongoose.Types.ObjectId.isValid(applicantId)) {
      return res.status(400).json({ message: "Invalid applicant ID format" });
    }

    // Fetch applications and populate job details
    const applications = await Application.find({ applicant: applicantId })
      .populate("job", "title companyname designation jobType location salaryRange education skills experience description workmode");

    if (!applications.length) {
      return res.status(404).json({ message: "No applications found." });
    }

    // Format response to send flattened job details
    const applicationDetails = applications.map((app) => ({
      jobId: app.job?._id || "N/A",
      applicantId: app.applicant,
      fullname: app.fullname || "N/A",
      email: app.email || "N/A",
      mobileNumber: app.mobileNumber || "N/A",
      city: app.city || "N/A",
      jobTitle: app.job?.title || "N/A",
      companyname: app.job?.companyname || "N/A",
      designation: app.job?.designation || "N/A",
      jobType: app.job?.jobType || "N/A",  // Accessing Job Type properly
      location: app.job?.location || "N/A",  // Accessing Location properly
      salaryRange: app.job?.salaryRange ? `${app.job.salaryRange.min} - ${app.job.salaryRange.max}` : "N/A", // Fixing Salary Range
      education: app.job?.education || "N/A",
      skills: app.job?.skills.length > 0 ? app.job.skills.join(", ") : "N/A", // Formatting Skills
      experience: app.job?.experience ? `${app.job.experience} years` : "N/A", // Fixing Experience
      description: app.job?.description || "N/A",  // Fixing Description
      workmode: app.job?.workmode || "N/A",  // Fixing Work Mode
      workstatus: app.workstatus || "N/A",
    }));
    
    return res.status(200).json({ applications: applicationDetails });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = getUserApplications;
