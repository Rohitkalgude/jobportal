const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Employer = require("../../models/Employerr");
const sendEmail = require("../../config/sendEmail");

const generateOTP = () => Math.floor(1000 + Math.random() * 9000).toString();

const registerEmployer = async (req, res) => {
  try {
    const { fullname, email, password, company, companylogo = "", mobileNumber, location } = req.body;

    if (!fullname || !email || !password || !company || !mobileNumber || !location) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // ✅ Check if email or mobile number already exists
    const existingEmployer = await Employer.findOne({ $or: [{ email }, { mobileNumber }] });
    if (existingEmployer) {
      return res.status(409).json({ message: "Employer with this email or mobile number already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationCode = generateOTP();

    const newEmployer = new Employer({
      fullname,
      email,
      password: hashedPassword,
      company,
      companylogo,
      mobileNumber,
      location, // ✅ Added location field
      isVerified: false,
      verificationCode,
    });

    await newEmployer.save();

    const token = jwt.sign({ employerId: newEmployer._id }, process.env.JWT_SECRET, {
      expiresIn: "365d",
    });

    res.status(201).json({
      message: "Successfully registered employer. Verification code sent to email.",
      employer: {
        _id: newEmployer._id,
        fullname,
        email,
        company,
        companylogo,
        mobileNumber,
        location, // ✅ Return location in response
        isVerified: newEmployer.isVerified,
      },
      token,
    });

    // ✅ Send verification email asynchronously
    sendEmail(
      email,
      "Verify Your Email - HireBridge",
      `<h1>Hi ${fullname},</h1>
       <p>Thank you for registering on HireBridge.</p>
      
       <br>
       <p>Best regards,</p>
       <p>HireBridge Team</p>`
    ).catch((err) => console.error("Email sending error:", err));

  } catch (error) {
    console.error("Registration Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = registerEmployer;
