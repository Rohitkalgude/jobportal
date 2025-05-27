const mongoose = require("mongoose");
const Job = require("../../models/Job");
const Employer = require("../../models/Employerr"); 

const jobpost = async (req, res) => {
    try {
        const { id,companyname, jobType, workmode, designation, location, salaryRange, education, experience, title, description, skills, companyLogo } = req.body;

        if (!id ||!companyname ||!jobType || !title || !designation || !location || !salaryRange?.min || !salaryRange?.max) {
            return res.status(400).json({ message: "Please provide all required fields" });
        }

        // Convert ID to ObjectId
        const employer = await Employer.findById(id);

        console.log("🔍 Checking Employer ID:", id);
        console.log("🛠 Employer Found in DB:", employer);

        if (!employer) {
            return res.status(404).json({ message: "Employer not found" });
        }

        const formattedSkills = Array.isArray(skills) ? skills : skills.split(",").map(skill => skill.trim());

        const newJob = new Job({
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
            skills: formattedSkills,
            companyLogo,
            postedBy: employer._id,
        });

        await newJob.save();
        res.status(201).json({ message: "Job posted successfully", job: newJob });
    } catch (error) {
        console.error("❌ Error posting job:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

module.exports = jobpost;
