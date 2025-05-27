const express = require("express");
const CompanyProfile = require("../controllers/CompanyContoller/Companyprofile");
const getallcomapny = require("../controllers/CompanyContoller/getallcompany")

const router = express.Router();

router.post("/profile", CompanyProfile );
router.get("/all/:id", getallcomapny );


module.exports = router;