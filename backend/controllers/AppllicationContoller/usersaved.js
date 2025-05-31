const mongoose = require("mongoose");
const Application = require("../../models/Application");
const User = require("../../models/User"); // Assuming you have a separate user model

const getUserApplications = async (req, res) => {
  try {
    const { applicantId } = req.params;

    // Validate the applicantId
    if (!mongoose.Types.ObjectId.isValid(applicantId)) {
      return res.status(400).json({ message: "Invalid applicant ID format." });
    }

    // Get all applications by the applicant and populate job details
    const applications = await Application.find({ applicant: applicantId })
      .populate("job", "title companyname designation jobType location salaryRange education skills experience description workmode");

    if (!applications.length) {
      return res.status(404).json({ message: "No applications found for this user." });
    }

    // Build job application details
    const appliedJobs = applications.map((app) => ({
      jobId: app.job?._id || "N/A",
      title: app.job?.title || "N/A",
      companyname: app.job?.companyname || "N/A",
      designation: app.job?.designation || "N/A",
      jobType: app.job?.jobType || "N/A",
      location: app.job?.location || "N/A",
      salaryRange: app.job?.salaryRange
        ? `${app.job.salaryRange.min} - ${app.job.salaryRange.max}`
        : "N/A",
      education: app.job?.education || "N/A",
      skills: app.job?.skills?.length > 0 ? app.job.skills : [],
      experience: app.job?.experience ? `${app.job.experience} years` : "N/A",
      description: app.job?.description || "N/A",
      workmode: app.job?.workmode || "N/A",
      applicationStatus: app.workstatus || "N/A",
      appliedAt: app.createdAt,
    }));

    // Extract applicant profile from the first application (all have same applicant)
    const applicantProfile = {
      applicantId,
      fullname: applications[0].fullname || "N/A",
      email: applications[0].email || "N/A",
      mobileNumber: applications[0].mobileNumber || "N/A",
      city: applications[0].city || "N/A",
      resume: applications[0].resume || "No resume uploaded",
    };

    return res.status(200).json({
      applicant: applicantProfile,
      appliedJobs,
    });
  } catch (error) {
    console.error("Error fetching applications:", error);
    return res.status(500).json({
      message: "Server error while fetching user applications.",
      error: error.message,
    });
  }
};

module.exports = getUserApplications;
