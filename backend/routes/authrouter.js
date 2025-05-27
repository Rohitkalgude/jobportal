const express = require("express");
const registerUser = require("../controllers/authController/registerUser");
const verifyUser = require("../controllers/authController/verifyUser")
const loginUser = require("../controllers/authController/login")
const profilecreate = require("../controllers/authController/profilecreate");
const editUser = require("../controllers/authController/profileedit");
const googleloginAuth = require("../controllers/authController/googleAuthlogin")
const deleteAccount = require("../controllers/authController/deleteaccount");
// const googlelregister = require("../controllers/authController/googleregister")

const router = express.Router();

router.post("/register",  registerUser);
// router.post("/google", googlelregister);
router.post("/verify", verifyUser);
router.post("/login", loginUser);
router.post("/google", googleloginAuth);
router.put("/profile",  profilecreate);
router.put("/edit/:id", editUser);
router.delete("/delete", deleteAccount);


module.exports = router;
