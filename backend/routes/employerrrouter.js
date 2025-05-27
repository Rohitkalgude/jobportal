const express = require("express");
const employerLogin = require("../controllers/EmployerrController/employerrlogin");
const registerEmployer = require("../controllers/EmployerrController/employerrregister");
const verifyEmployer = require("../controllers/EmployerrController/verifyEmployer")
const googleEmployerAuth= require("../controllers/EmployerrController/googleEmployerAuth")
const employerrprofile = require("../controllers/EmployerrController/employerrprofile")

const router = express.Router();

router.post("/register", registerEmployer);
router.post("/verify", verifyEmployer);  
router.post("/login", employerLogin);
router.post("/google",googleEmployerAuth)
router.put("/profile/:id", employerrprofile)



module.exports = router;
