const Job = require("../../models/Job");

const getJobsByEmployer = async (req, res) => {
  try {
    const employerId = req.params.id;

    const jobs = await Job.find({ postedBy: employerId }).sort({ createdAt: -1 });

    res.status(200).json(jobs);
  } catch (error) {
    console.error("❌ Error fetching jobs by employer:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = getJobsByEmployer;
