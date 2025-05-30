const bcrypt = require("bcryptjs");
const Employerr = require("../../models/Employerr");
const comparePasswords = require("../../config/comparePasswords");
const generateJWT = require("../../config/generateJWT");

const employerLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("🔹 Received Email:", email);
    console.log("🔹 Received Password:", password);

    // Find employer by email
    const employer = await Employerr.findOne({ email });
    if (!employer) {
      console.log("❌ Employer not found!");
      return res.status(400).json({ message: "Invalid email or password" });
    }

    console.log("🔹 Stored Hashed Password:", employer.password);

    // 🔥 Ensure password is a string
    const passwordString = password.toString().trim();
    console.log(passwordString);
    const newHash = await bcrypt.hash(passwordString, 10);
    console.log("🔹 New Hash for Entered Password:", newHash);
    console.log("🔹 Stored Hash in DB:", employer.password);

  
    const isPasswordValid = await comparePasswords(password, employer.password);

    console.log("🔹 Password Match Result:", isPasswordValid);

    if (!isPasswordValid) {
      console.log("❌ Invalid credentials!");
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Generate JWT token
    const token = generateJWT();
    console.log("✅ Login successful for:", email);

    return res.status(200).json({
      _id: employer._id,
      fullname: employer.fullname,
      email: employer.email,
      company: employer.company,
      mobileNumber: employer.mobileNumber,
      companylogo: employer.companylogo,
      token,
    });
  } catch (error) {
    console.error("❌ Login error:", error);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

module.exports = employerLogin;
