const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");
const Employerr = require("../../models/Employerr");

const client = new OAuth2Client(process.env.GOOGLE_EMPLOYER_CLIENT_ID);

const googleEmployerAuth = async (req, res) => {
  try {
    const { credential } = req.body; // ✅ Fix: Use `credential` instead of `tokenId`
    
    if (!credential) {
      return res.status(400).json({ message: "Google token is required" });
    }

    // Verify Google token
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_EMPLOYER_CLIENT_ID,
    });

    const { email, name, picture, sub } = ticket.getPayload();

    let employer = await Employerr.findOne({ email });

    if (!employer) {
      employer = new Employerr({
        fullname: name,
        email,
        googleId: sub,
        profilePicture: picture,
        isVerified: true,
      });
      await employer.save();
    }

    // Generate JWT token
    const token = jwt.sign({ employerId: employer._id }, process.env.JWT_SECRET, {
      expiresIn: "365d",
    });

    res.status(200).json({ token, message: "Google login successful!" });
  } catch (error) {
    console.error("Google Employer Auth Error:", error);
    res.status(500).json({ message: "Google login failed." });
  }
};

module.exports = googleEmployerAuth;
