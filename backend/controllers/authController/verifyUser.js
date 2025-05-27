const User = require("../../models/User");
const sendEmail = require("../../config/sendEmail");

const verifyUser = async (req, res) => {
  try {
    const { email, verificationCode } = req.body;

    if (!email || !verificationCode) {
      return res.status(400).json({ message: "Email and verification code are required." });
    }

    const user = await User.findOne({ email });

    if (!user) return res.status(404).json({ message: "User not found." });
    if (user.isVerified) return res.status(400).json({ message: "User is already verified." });

    if (user.verificationCode !== verificationCode) {
      return res.status(400).json({ message: "Invalid verification code." });
    }

    // Mark user as verified and remove verification code
    user.isVerified = true;
    user.verificationCode = null;
    await user.save();

    // Send confirmation email
    const subject = "Your Email Has Been Verified - Welcome to HireBridge!";
    const html = `<h1>Hi ${user.fullname},</h1>
                  <p>Your email has been successfully verified. You can now log in and access all features.</p>
                  <p>We’re excited to have you on board!</p>
                  <br>
                  <p>Best regards,</p>
                  <p>HireBridge Team</p>`;

    sendEmail(email, subject, html).catch((err) => console.error("Email sending error:", err));

    res.status(200).json({ message: "User verified successfully! A confirmation email has been sent." });

  } catch (error) {
    console.error("Verification Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = verifyUser;
