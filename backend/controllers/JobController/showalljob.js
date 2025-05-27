const Job = require("../../models/Job");

const showAllJobs = async (req, res) => {
  try {
    // Fetch all jobs from the database and populate employer details
    const jobs = await Job.find()
      .populate({
        path: "postedBy",
        model: "Employerr", // Ensure it matches your schema's model name
        select: "fullname email company companylogo",
      })
      .sort({ createdAt: -1 }); // Sorting by newest jobs first

    // If no jobs found, return 404
    if (!jobs.length) {
      return res.status(404).json({ success: false, message: "No jobs found" });
    }

    // Send response with job data
    res.status(200).json({ success: true, count: jobs.length, jobs });
  } catch (error) {
    console.error("Error fetching jobs:", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

module.exports = showAllJobs;
