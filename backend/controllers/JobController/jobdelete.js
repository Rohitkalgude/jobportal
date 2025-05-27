const Job = require("../../models/Job");
const Employerr = require("../../models/Employerr");
const mongoose = require("mongoose");

const deletejob = async (req, res) => {
  try {
    const { jobId } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(jobId)) {
      return res.status(400).json({ message: "Invalid job ID format" });
    }

    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    await Job.findByIdAndDelete(jobId);
    res.status(200).json({ message: "Job deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};



module.exports = deletejob;
