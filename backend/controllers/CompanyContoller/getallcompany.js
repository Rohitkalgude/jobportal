const mongoose = require("mongoose");
const Company = require("../../models/Company");

const getCompanyProfile = async (req, res) => {
  try {
    let { id } = req.params; // Extract ID from request params

    // ✅ Remove any leading `:` from the ID (if present)
    id = id.replace(/^:/, "");

    // ✅ Check if ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "Invalid Company ID format" });
    }

    const company = await Company.findById(id);

    if (!company) {
      return res.status(404).json({ success: false, message: "Company not found" });
    }

    res.status(200).json({
      success: true,
      company,
    });
  } catch (error) {
    console.error("Error fetching company profile:", error);
    res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
  }
};

module.exports = getCompanyProfile;
