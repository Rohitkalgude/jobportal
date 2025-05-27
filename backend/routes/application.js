const express = require("express");
const applyJob = require("../controllers/AppllicationContoller/applyjob");
const filterJob  = require("../controllers/AppllicationContoller/filterjob");
const updateApplicationStatus = require("../controllers/AppllicationContoller/useremail")
const getApplicantsForJob = require("../controllers/AppllicationContoller/getuserapplyjobs")
const appliedJobs = require("../controllers/AppllicationContoller/usersaved")

const router = express.Router();

router.post("/applyJob", applyJob);
router.get("/filter",  filterJob);
router.put("/status", updateApplicationStatus);
router.get("/applicantjob/:jobId", getApplicantsForJob);
router.get("/appliedJobs/:applicantId", appliedJobs)



 

module.exports = router;
