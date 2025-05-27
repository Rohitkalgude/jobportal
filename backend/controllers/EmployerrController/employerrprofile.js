// Backend: Update Employer Profile Controller
const Employer = require("../../models/Employerr");

const updateEmployerProfile = async (req, res) => {
    try {
        const { fullname, email, company, mobileNumber, location } = req.body;

        // Find employer by ID
        const employer = await Employer.findById(req.params.id);
        if (!employer) {
            return res.status(404).json({ message: "Employer not found" });
        }

        // Update fields if provided in the request body
        employer.fullname = fullname ?? employer.fullname;
        employer.email = email ?? employer.email;
        employer.company = company ?? employer.company;
        employer.mobileNumber = mobileNumber ?? employer.mobileNumber;
        employer.location = location ?? employer.location;

        // Save updated employer data
        const updatedEmployer = await employer.save();
        return res.status(200).json({ message: "Profile updated successfully", updatedEmployer });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

module.exports = updateEmployerProfile;
