const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");
const User = require("../../models/User");

const client = new OAuth2Client(process.env.GOOGLE_USER_CLIENT_ID);

const googleloginAuth = async (req, res) => {
  try {
    const { tokenId } = req.body;
    
    if (!tokenId) {
      return res.status(400).json({ message: "Token ID is required" });
    }

    const ticket = await client.verifyIdToken({
      idToken: tokenId,
      audience: process.env.GOOGLE_USER_CLIENT_ID,
    });

    const { email, name, picture, sub } = ticket.getPayload();

    let user = await User.findOne({ email });

    if (!user) {
      user = new User({
        fullname: name,
        email,
        googleId: sub,
        profilePicture: picture,
        isVerified: true,
      });
      await user.save();
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "365d",
    });

    res.status(200).json({ token, message: "Google login successful!" });
  } catch (error) {
    console.error("Google Auth Error:", error);
    res.status(500).json({ message: "Google login failed." });
  }
};

module.exports = googleloginAuth;
