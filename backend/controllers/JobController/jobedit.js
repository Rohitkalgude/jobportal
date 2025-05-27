  // const mongoose = require("mongoose");
  // const Job = require("../../models/Job");

  // const editjob = async (req, res) => {
  //   try {
  //     console.log("Received jobId in backend:", req.params.jobId);

  //     // ✅ Validate jobId format
  //     if (!mongoose.Types.ObjectId.isValid(req.params.jobId)) {
  //       return res.status(400).json({ message: "Invalid jobId format" });
  //     }

  //     const job = await Job.findById(req.params.jobId);

  //     if (!job) {
  //       return res.status(404).json({ message: "Job not found" });
  //     }

  //     let { jobType, designation, location, salaryRange, title, description, skills } = req.body;

  //     // ✅ Validate jobType: Convert to lowercase and check against allowed values
  //     if (jobType) {
  //       jobType = jobType.toLowerCase();
  //       const validJobTypes = ["full-time", "part-time", "internship"];
  //       if (!validJobTypes.includes(jobType)) {
  //         return res.status(400).json({ message: `Invalid jobType. Allowed values: ${validJobTypes.join(", ")}` });
  //       }
  //     }

  //     // ✅ Convert salaryRange string to object if necessary
  //     if (typeof salaryRange === "string" && salaryRange.includes("-")) {
  //       const [min, max] = salaryRange.split("-").map(num => parseInt(num.trim(), 10));
  //       if (!isNaN(min) && !isNaN(max) && min > 0 && max > 0) {
  //         salaryRange = { min, max };
  //       } else {
  //         return res.status(400).json({ message: "Invalid salaryRange format. Use '60000-80000'" });
  //       }
  //     }

  //     // ✅ Validate salaryRange object format
  //     if (salaryRange && (typeof salaryRange !== "object" || !salaryRange.min || !salaryRange.max)) {
  //       return res.status(400).json({ message: "salaryRange must be an object with { min, max }" });
  //     }

  //     // ✅ Update only provided fields
  //     if (jobType) job.jobType = jobType;
  //     if (designation) job.designation = designation;
  //     if (location) job.location = location;
  //     if (salaryRange) job.salaryRange = salaryRange;
  //     if (title) job.title = title;
  //     if (description) job.description = description;
  //     if (skills) job.skills = skills;

  //     await job.save();
  //     res.status(200).json({ message: "Job updated successfully", job });
  //   } catch (error) {
  //     console.error("Error updating job:", error);
  //     res.status(500).json({ message: "Server error", error: error.message });
  //   }
  // };

  // module.exports = editjob;








const mongoose = require("mongoose");
const Job = require("../../models/Job");

const editJob = async (req, res) => {
  try {
    const { jobId } = req.params;

    // Validate jobId
    if (!mongoose.Types.ObjectId.isValid(jobId)) {
      return res.status(400).json({ message: "Invalid job ID" });
    }

    const job = await Job.findById(jobId);
    if (!job) return res.status(404).json({ message: "Job not found" });

    let {
      companyname,
      jobType,
      workmode,
      designation,
      location,
      salaryRange,
      education,
      experience,
      title,
      description,
      skills
    } = req.body;

    // Validate and sanitize fields
    const validJobTypes = ["full-time", "part-time", "internship"];
    const validWorkModes = ["work-from-home", "office", "hybrid"];

    if (jobType && !validJobTypes.includes(jobType.toLowerCase())) {
      return res.status(400).json({ message: `Invalid jobType. Allowed: ${validJobTypes.join(", ")}` });
    }

    if (workmode && !validWorkModes.includes(workmode.toLowerCase())) {
      return res.status(400).json({ message: `Invalid workmode. Allowed: ${validWorkModes.join(", ")}` });
    }

    if (salaryRange) {
      const min = parseInt(salaryRange.min);
      const max = parseInt(salaryRange.max);
      if (isNaN(min) || isNaN(max) || min <= 0 || max <= 0) {
        return res.status(400).json({ message: "Salary min and max must be positive numbers." });
      }
      salaryRange = { min, max };
    }

    if (experience !== undefined && (isNaN(experience) || experience < 0)) {
      return res.status(400).json({ message: "Experience must be a non-negative number." });
    }

    // Update only provided fields
    if (companyname) job.companyname = companyname;
    if (jobType) job.jobType = jobType.toLowerCase();
    if (workmode) job.workmode = workmode.toLowerCase();
    if (designation) job.designation = designation;
    if (location) job.location = location;
    if (salaryRange) job.salaryRange = salaryRange;
    if (education) job.education = education;
    if (experience !== undefined) job.experience = experience;
    if (title) job.title = title;
    if (description) job.description = description;
    if (skills) job.skills = skills;

    await job.save();

    res.status(200).json({ message: "Job updated successfully", job });
  } catch (error) {
    console.error("Edit Job Error:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = editJob;
