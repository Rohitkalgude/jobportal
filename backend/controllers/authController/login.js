// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const User = require("../../models/User");

// const loginUser = async (req, res) => {
//   try {
//     const { email, password } = req.body;
    
//     if (!email || !password) {
//       return res.status(400).json({ message: "Email and password are required." });
//     }

//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(404).json({ message: "User not found." });
//     }

//     const isMatch = await user.comparePassword(password);
//     if (!isMatch) {
//       return res.status(401).json({ message: "Invalid credentials." });
//     }

//     // Generate JWT token using the model's method
//     const token = user.generateJWT();

//     res.status(200).json({
//       message: "Login successful",
//       token,
//       user: {
//         id: user._id,
//         fullname: user.fullname,
//         email: user.email,
//         city: user.city,
//         workstatus: user.workstatus,
//         gender: user.gender,
//         age: user.age,
//       },
//     });
//   } catch (error) {
//     console.error("Error during login:", error);
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// };

// module.exports = loginUser;







const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required." });
    }

    // ✅ Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      console.log("User not found for email:", email);
      return res.status(404).json({ message: "User not found." });
    }

    // ✅ Check if passwords match
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log("Password mismatch for user:", email);
      return res.status(401).json({ message: "Invalid credentials." });
    }

    // ✅ Generate JWT token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "365d" }
    );

    console.log("Login successful for:", user.email);

    return res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        fullname: user.fullname,
        email: user.email,
        city: user.city,
        workstatus: user.workstatus,
        gender: user.gender,
        age: user.age,
      },
    });

  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = loginUser;
