const Employer = require("../../models/Employerr");
const sendEmail = require("../../config/sendEmail");

const verifyEmployer = async (req, res) => {
  try {
    const { email, verificationCode } = req.body;

    if (!email || !verificationCode) {
      return res.status(400).json({ message: "Email and verification code are required" });
    }

    const employer = await Employer.findOne({ email });

    if (!employer) {
      return res.status(404).json({ message: "Employer not found" });
    }

    if (employer.isVerified) {
      return res.status(400).json({ message: "Employer is already verified" });
    }

    if (employer.verificationCode !== verificationCode) {
      return res.status(400).json({ message: "Invalid verification code" });
    }

    // Mark the employer as verified
    employer.isVerified = true;
    employer.verificationCode = null; // Remove the code after verification
    await employer.save();

    // Send confirmation email
    const subject = "Your Email Has Been Verified - HireBridge";
    const html = `<h1>Hi ${employer.fullname},</h1>
                  <p>Your email has been successfully verified. You can now log in and start posting jobs.</p>
                  <p>We’re excited to have you onboard!</p>
                  <br>
                  <p>Best regards,</p>
                  <p>HireBridge Team</p>`;

    sendEmail(email, subject, html).catch((err) => console.error("Email sending error:", err));

    res.status(200).json({ message: "Email verified successfully. Confirmation email sent." });

  } catch (error) {
    console.error("Verification Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = verifyEmployer;
