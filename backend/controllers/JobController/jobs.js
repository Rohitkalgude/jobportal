const Job = require("../../models/Job");

// Get all jobs
const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find().populate("postedBy", "fullname email");
    res.status(200).json({ jobs }); // Ensure response matches frontend expectation
  } catch (error) {
    res.status(500).json({ message: "Error fetching jobs", error: error.message });
  }
};

module.exports = getAllJobs;
  