const Application = require("../../models/Application");
const Job = require("../../models/Job");

const getApplicantsForJob = async (req, res) => {
  try {
    const { jobId } = req.params;

    if (!jobId) {
      return res.status(400).json({ message: "Job ID is required." });
    }

    const applications = await Application.find({ job: jobId })
      .populate(
        "applicant",
        "fullname email city mobileNumber workstatus education skills experience resume"
      )
      .populate("job", "title companyname designation")
      .lean();

    const applicants = applications.map((app) => ({
      applicantId: app.applicant?._id,
      fullname: app.applicant?.fullname || "Unknown",
      email: app.applicant?.email || "Unknown",
      city: app.applicant?.city || "Unknown",
      mobileNumber: app.applicant?.mobileNumber || "Not provided",
      workstatus: app.applicant?.workstatus || "Not specified",
      education: app.applicant?.education || "Not provided",
      skills: Array.isArray(app.applicant?.skills) ? app.applicant.skills : [],
      experience: Array.isArray(app.applicant?.experience)
        ? app.applicant.experience
        : [],
      jobTitle: app.job?.title || "Unknown",
      companyName: app.job?.companyname || "Unknown",
      designation: app.job?.designation || "Unknown",
      resume: app.applicant?.resume || "No resume uploaded",
      applicationStatus: app.status || "Pending",
      appliedAt: app.appliedAt
        ? new Date(app.appliedAt).toISOString()
        : "Unknown date",
      jobId: jobId, // Required for updating status
    }));

    return res.status(200).json({ jobId, applicants });
  } catch (err) {
    console.error("Error fetching applicants:", err.message);
    return res.status(500).json({
      message: "Internal Server Error",
      error: err.message,
    });
  }
};

module.exports = getApplicantsForJob;







// const Application = require("../../models/Application");
// const Job = require("../../models/Job");
// const mongoose = require("mongoose");

// const getApplicantsForJob = async (req, res) => {
//   try {
//     const { jobId } = req.params;

//     // Validate jobId
//     if (!jobId || !mongoose.Types.ObjectId.isValid(jobId)) {
//       return res.status(400).json({ message: "Valid Job ID is required." });
//     }

//     // Get employer ID from authenticated request
//     const employerId = req.applicantId._id;

//     // Fetch job and verify ownership
//     const job = await Job.findById(jobId);
//     if (!job) {
//       return res.status(404).json({ message: "Job not found." });
//     }

//     // 🛡️ Check if this job was posted by the authenticated employer
//     if (job.employer.toString() !== employerId.toString()) {
//       return res.status(403).json({ message: "Access denied. You do not own this job." });
//     }

//     // Fetch applications for this job
//     const applications = await Application.find({ job: jobId })
//       .populate(
//         "applicant",
//         "fullname email city mobileNumber workstatus education skills experience resume"
//       )
//       .populate("job", "title companyname designation")
//       .lean();

//     const applicants = applications.map((app) => ({
//       applicantId: app.applicant?._id,
//       fullname: app.applicant?.fullname || "Unknown",
//       email: app.applicant?.email || "Unknown",
//       city: app.applicant?.city || "Unknown",
//       mobileNumber: app.applicant?.mobileNumber || "Not provided",
//       workstatus: app.applicant?.workstatus || "Not specified",
//       education: app.applicant?.education || "Not provided",
//       skills: Array.isArray(app.applicant?.skills) ? app.applicant.skills : [],
//       experience: Array.isArray(app.applicant?.experience)
//         ? app.applicant.experience
//         : [],
//       jobTitle: app.job?.title || "Unknown",
//       companyName: app.job?.companyname || "Unknown",
//       designation: app.job?.designation || "Unknown",
//       resume: app.applicant?.resume || "No resume uploaded",
//       applicationStatus: app.status || "Pending",
//       appliedAt: app.appliedAt
//         ? new Date(app.appliedAt).toISOString()
//         : "Unknown date",
//       jobId: jobId,
//     }));

//     return res.status(200).json({ jobId, applicants });
//   } catch (err) {
//     console.error("Error fetching applicants:", err.message);
//     return res.status(500).json({
//       message: "Internal Server Error",
//       error: err.message,
//     });
//   }
// };

// module.exports = getApplicantsForJob;
