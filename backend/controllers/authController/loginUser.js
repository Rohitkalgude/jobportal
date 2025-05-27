const User = require("../../models/User");

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate required fields
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required." });
    }

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Compare passwords
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    // Generate a JWT token
    const token = user.generateJWT();

    // Respond with user details and token
    res.status(200).json({
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
    console.error("Login Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = loginUser;















// const jwt = require("jsonwebtoken");
// const User = require("../../models/User");

// const loginUser = async (req, res) => {
//   try {
//     const { email, password } = req.body;
    
//     // Validate required fields
//     if (!email || !password) {
//       return res.status(400).json({ message: "Email and password are required." });
//     }
    
//     // Find user by email
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(404).json({ message: "User not found." });
//     }
    
//     // Check password
//     const isMatch = await user.comparePassword(password);
//     if (!isMatch) {
//       return res.status(401).json({ message: "Invalid credentials." });
//     }
    
//     // Generate JWT token using user schema method
//     const token = user.generateJWT();
    
//     // Respond with user details including user id
//     res.status(200).json({
//       message: "Login successful",
//       token,
//       user: {
//         id: user._id, // Added user id
//         fullname: user.fullname,
//         email: user.email,
//         city: user.city,
//         workstatus: user.workstatus,
//         gender: user.gender,
//         age: user.age,
//       },
//     });
//   } catch (error) {
//     console.error("Login Error:", error);
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// };

// module.exports = loginUser;
