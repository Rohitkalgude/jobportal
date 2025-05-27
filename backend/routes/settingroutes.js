const express = require("express");
const updateaccount = require("../controllers/SettingsControllers/updateaccount")
const contoalprofile = require("../controllers/SettingsControllers/contoalprofile")
const notification = require("../controllers/SettingsControllers/notification")

const router = express.Router();

router.put("/update", updateaccount); 
router.get("/profile/:id", contoalprofile);
router.put("/notification/:id", notification);


module.exports = router;
