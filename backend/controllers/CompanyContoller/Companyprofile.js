const Company = require("../../models/Company");

const createcopmany = async (req, res) => {
  try {
    const {
      companyName,
      industry,
      location,
      website,
      foundedDate,
      companySize,
      companyType,
      about,
    } = req.body;

    let company = await Company.findOne();

    if (company) {
      company.companyName = companyName;
      company.industry = industry;
      company.location = location;
      company.website = website;
      company.foundedDate = foundedDate;
      company.companySize = companySize;
      company.companyType = companyType;
      company.about = about;
      await company.save();
    } else {
      // Create new company
      company = new Company({
        companyName,
        industry,
        location,
        website,
        foundedDate,
        companySize,
        companyType,
        about,
      });
      await company.save();
    }

    res.status(200).json({
      success: true,
      message: "Company profile updated successfully",
      companyId: company._id, // Return the company ID
      company,
    });
  } catch (error) {
    console.error("Error updating company profile:", error);
    res
      .status(500)
      .json({
        success: false,
        message: "Internal Server Error",
        error: error.message,
      });
  }
};

module.exports = createcopmany;
