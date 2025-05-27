const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");
const User = require("../../models/User");
const bcrypt = require("bcryptjs");  // ✅ Import bcrypt for password hashing

const client = new OAuth2Client(process.env.GOOGLE_USER_CLIENT_ID);

const googleRegisterAuth = async (req, res) => {
  try {
    const { tokenId, fullname, email, password, gender, age, city, workstatus } = req.body;

    if (!tokenId) {
      return res.status(400).json({ message: "Token ID is required" });
    }

    const ticket = await client.verifyIdToken({
      idToken: tokenId,
      audience: process.env.GOOGLE_USER_CLIENT_ID,
    });

    const { email: googleEmail, name, picture, sub } = ticket.getPayload();

    // ✅ Use Google-provided email if not provided by user
    const finalEmail = email || googleEmail;

    // Check if user already exists
    const existingUser = await User.findOne({ email: finalEmail });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists. Please log in instead." });
    }

    if (!gender || !age || !city || !workstatus || !finalEmail) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // ✅ Hash password (generate a random one if not provided)
    const hashedPassword = password ? await bcrypt.hash(password, 10) : await bcrypt.hash(sub, 10);

    const newUser = new User({
      fullname: fullname || name,
      email: finalEmail,
      password: hashedPassword,  // ✅ Store hashed password
      googleId: sub,
      profilePicture: picture,
      isVerified: true,
      gender,
      age,
      city,
      workstatus,
    });

    await newUser.save();

    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "365d",
    });

    res.status(201).json({
      token,
      user: {
        id: newUser._id,
        fullname: newUser.fullname,
        email: newUser.email,
        profilePicture: newUser.profilePicture,
        gender: newUser.gender,
        age: newUser.age,
        city: newUser.city,
        workstatus: newUser.workstatus,
      },
      message: "Google registration successful!",
    });
  } catch (error) {
    console.error("Google Register Error:", error);
    res.status(500).json({ message: "Google registration failed." });
  }
};

module.exports = googleRegisterAuth;
