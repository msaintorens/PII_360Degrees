const express = require("express");
const router = express.Router();
const { db } = require("../models/video");

const videosCtrl = require("../controllers/videos");

router.post("/", videosCtrl.createVideo);

module.exports = router;
