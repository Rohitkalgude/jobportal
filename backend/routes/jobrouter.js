const express = require("express");
const jobpost = require("../controllers/JobController/createjob");
const showalljob = require("../controllers/JobController/showalljob");
const getAppliedJobs = require("../controllers/JobController/all")
const jobedit = require("../controllers/JobController/jobedit");
const jobdelete = require("../controllers/JobController/jobdelete");
const jobs = require("../controllers/JobController/jobs")
const blockcompany = require("../controllers/JobController/blockcompany");
const filterJob = require("../controllers/JobController/filter")
const savedJobs = require("../controllers/JobController/saveJob");
const getSavedJobs = require("../controllers/JobController/allsavedjob");
const getJobsByEmployer = require("../controllers/JobController/getJobsByEmployer")


const router = express.Router();

router.post("/jobpost", jobpost);
router.get("/alljob", showalljob);
router.get("/applications/:applicantId", getAppliedJobs);
router.put("/edit/:jobId", jobedit);
router.delete("/delete/:jobId", jobdelete);
router.get("/jobs", jobs);
router.put("/block", blockcompany)
router.get("/filter",filterJob)
router.post("/savejob", savedJobs);
router.get("/savedjobs/:userId", getSavedJobs);
router.get("/employer/:id", getJobsByEmployer);




module.exports = router;
