const User = require("../../models/User");
const Job = require("../../models/Job");

// ✅ Save a job
const saveJob = async (req, res) => {
  try {
    const { userId, jobId } = req.body;

    // Validate user and job existence
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const job = await Job.findById(jobId);
    if (!job) return res.status(404).json({ message: "Job not found" });

    // Check if job is already saved
    if (user.savedJobs.includes(jobId)) {
      return res.status(400).json({ message: "Job already saved" });
    }

    // Save the job
    user.savedJobs.push(jobId);
    await user.save();

    res.status(200).json({ message: "Job saved successfully", savedJobs: user.savedJobs });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

module.exports =  saveJob;





// const User = require("../../models/User");
// const Job = require("../../models/Job");

// const saveJob = async (req, res) => {
//   try {
//     const { userId, jobId, companyName, companyLogo, designation, jobType, location, salary, education, skills, experience, description, workMode, postedAt } = req.body;

//     // ✅ Validate user
//     const user = await User.findById(userId);
//     if (!user) return res.status(404).json({ message: "User not found" });

//     // ✅ Validate job
//     const job = await Job.findById(jobId);
//     if (!job) return res.status(404).json({ message: "Job not found" });

//     // ✅ Ensure savedJobs exists
//     if (!Array.isArray(user.savedJobs)) {
//       user.savedJobs = [];
//     }

//     // ✅ Check if job is already saved
//     if (user.savedJobs.some(savedJob => savedJob.jobId.toString() === jobId.toString())) {
//       return res.status(400).json({ message: "Job already saved" });
//     }

//     // ✅ Prepare job details to store
//     const jobDetails = {
//       jobId,
//       companyName,
//       companyLogo,
//       designation,
//       jobType,
//       location,
//       salary,
//       education,
//       skills,
//       experience,
//       description,
//       workMode,
//       postedAt,
//     };

//     // ✅ Save job details
//     user.savedJobs.push(jobDetails);
//     await user.save();

//     res.status(200).json({ message: "Job saved successfully", savedJobs: user.savedJobs });
//   } catch (error) {
//     console.error("Error saving job:", error);
//     res.status(500).json({ message: "Internal Server Error", error: error.message });
//   }
// };

// module.exports = saveJob;
