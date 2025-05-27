const Job = require("../../models/Job");

const blockCompany = async (req, res) => {
    try {
        const { companyname } = req.body;
        if (!companyname) {
            return res.status(400).json({ error: "Company name is required." });
        }

        // Find and block all jobs posted by this company
        const result = await Job.updateMany(
            { companyname },
            { $set: { isBlocked: true } }
        );

        if (result.modifiedCount === 0) {
            return res.status(404).json({ error: "No jobs found for this company." });
        }

        res.json({ message: `All jobs from '${companyname}' have been blocked successfully.` });
    } catch (error) {
        console.error("Error blocking company:", error);
        res.status(500).json({ error: "Failed to block company." });
    }
};

module.exports = blockCompany;
