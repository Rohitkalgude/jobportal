// const Application = require("../../models/Application");
// const Job = require("../../models/Job");

// const getApplicantsForJob = async (req, res) => {
//   try {
//     const { jobId } = req.params;

//     if (!jobId) {
//       return res.status(400).json({ message: "Job ID is required." });
//     }

//     console.log(`Fetching applicants for Job ID: ${jobId}`);

//     const applications = await Application.find({ job: jobId })
//       .populate(
//         "applicant",
//         "fullname email city mobileNumber workstatus education skills experience resume"
//       ) 
//       .populate("job", "title companyname designation") 
//       .lean();

//     if (!applications.length) {
//       return res.status(200).json({ jobId, applicants: [] });
//     }

//     const applicants = applications.map((app) => ({
//       applicantId: app.applicant?._id || "N/A",
//       fullname: app.applicant?.fullname || "Unknown",
//       email: app.applicant?.email || "Unknown",
//       city: app.applicant?.city || "Unknown",
//       mobileNumber: app.applicant?.mobileNumber || "Not provided",
//       workstatus: app.applicant?.workstatus || "Not specified",
//       education: app.applicant?.education || "Not provided",
//       skills: Array.isArray(app.applicant?.skills) ? app.applicant.skills : [],
//       experience: Array.isArray(app.applicant?.experience) ? app.applicant.experience : [],
//       jobTitle: app.job?.title || "Unknown Job",
//       companyName: app.job?.companyname || "Unknown Company", 
//       designation: app.job?.designation || "Unknown designation", 
//       resume: app?.resume || "No resume uploaded",
//       applicationStatus: app.status || "Pending",
//       appliedAt: app.appliedAt ? new Date(app.appliedAt).toISOString() : "Unknown date",
//     }));

//     res.status(200).json({ jobId, applicants });
//   } catch (error) {
//     console.error("Error fetching applicants:", error);
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// };

// module.exports = getApplicantsForJob;





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
