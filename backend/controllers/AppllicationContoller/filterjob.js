const Job = require("../../models/Job");
const filterJob = async (req, res) => {
    
try {
    const { jobType, workmode, minSalary, maxSalary, education, experience } = req.query;
    let filters = {};

    if (jobType) filters.jobType = jobType;
    if (workmode) filters.workmode = workmode;
    if (education) filters.education = education;
    if (experience) filters.experience = { $gte: parseInt(experience) };
    if (minSalary || maxSalary) {
      filters["salaryRange.min"] = minSalary ? { $gte: parseInt(minSalary) } : undefined;
      filters["salaryRange.max"] = maxSalary ? { $lte: parseInt(maxSalary) } : undefined;
    }

    // Remove undefined filters
    Object.keys(filters).forEach(key => filters[key] === undefined && delete filters[key]);

    const jobs = await Job.find(filters);
    res.status(200).json(jobs);
  } catch (error) {
    console.error("Error fetching jobs:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = filterJob;


