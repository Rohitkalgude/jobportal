const Job = require("../../models/Job");
const User = require("../../models/User");

// ✅ Fetch Saved Job Details
const getSavedJobs = async (req, res) => {
  try {
    const { userId } = req.params; // Get userId from request params

    // Find user and check if they exist
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Fetch all job details using saved job IDs
    const savedJobs = await Job.find({ _id: { $in: user.savedJobs } });

    res.status(200).json({ savedJobs });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

module.exports = getSavedJobs;
