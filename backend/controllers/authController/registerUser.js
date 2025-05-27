// const bcrypt = require("bcryptjs");
// const User = require("../../models/User");
// const sendEmail = require("../../config/sendEmail");

// const generateOTP = () => Math.floor(1000 + Math.random() * 9000).toString();

// const registerUser = async (req, res) => {
//   try {
//     const { fullname, email, password, city, workstatus, gender, age ,mobileNumber} =
//       req.body;

//     if (
//       !fullname ||
//       !email ||
//       !password ||
//       !city ||
//       !workstatus ||
//       !gender ||
//       !age ||
//       !mobileNumber
//     ) {
//       return res.status(400).json({ message: "All fields are required." });
//     }

//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ message: "Email is already registered." });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);
//     const verificationCode = generateOTP();

//     const newUser = new User({
//       fullname,
//       email,
//       password: hashedPassword,
//       city,
//       workstatus,
//       gender,
//       age,
//       mobileNumber,
//       isVerified: false,
//       verificationCode,
//     });

//     await newUser.save();

//     // Send verification email asynchronously
//     sendEmail(
//       email,
//       " Verify Your Email - HireBridge",
//       `<h1>Hi ${fullname},</h1>
//        <p>Thank you for registering on HireBridge.</p>
//        <br>
//        <p>Best regards,</p>
//        <p>HireBridge Team</p>
//     `
//     ).catch((err) => console.error("Email Error:", err));

//     // Generate JWT token
//     const token = newUser.generateJWT();

//     res.status(201).json({
//       message: "User registered! Verification code sent to email.",
//       user: { id: newUser._id, fullname, email, isVerified: false },
//       token,
//     });
//   } catch (error) {
//     console.error("Registration Error:", error);
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// };

// module.exports = registerUser;






const bcrypt = require("bcryptjs");
const User = require("../../models/User");
const sendEmail = require("../../config/sendEmail");

const generateOTP = () => Math.floor(1000 + Math.random() * 9000).toString();

const registerUser = async (req, res) => {
  try {
    const { fullname, email, password, city, workstatus, gender, age, mobileNumber} = req.body;

    // ✅ Check for required fields
    if (!fullname || !email || !password || !city || !workstatus || !gender || !age || !mobileNumber) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // ✅ Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email is already registered." });
    }

    // ✅ Hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationCode = generateOTP();

    // ✅ Ensure experience is an array before saving

    // ✅ Create new user
    const newUser = new User({
      fullname,
      email,
      password: hashedPassword,
      city,
      workstatus,
      gender,
      age,
      mobileNumber,
      isVerified: false,
      verificationCode,
    });

    await newUser.save();

    // ✅ Send verification email asynchronously
    sendEmail(
      email,
      "Verify Your Email - HireBridge",
      `<h1>Hi ${fullname},</h1>
       <p>Thank you for registering on HireBridge.</p>
       <p>Your verification code is: <strong>${verificationCode}</strong></p>
       <p>Best regards,</p>
       <p>HireBridge Team</p>`
    ).catch((err) => console.error("Email Error:", err));

    // ✅ Generate JWT token
    const token = newUser.generateJWT();

    res.status(201).json({
      message: "User registered successfully! Verification code sent to email.",
      user: {
        id: newUser._id,
        fullname: newUser.fullname,
        email: newUser.email,
        city: newUser.city,
        workstatus: newUser.workstatus,
        mobileNumber: newUser.mobileNumber,
        isVerified: false,
      },
      token,
    });
  } catch (error) {
    console.error("Registration Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = registerUser;
