const express = require("express");
const router = express.Router();
const { db } = require("../models/video");

const usersCtrl = require("../controllers/users");

router.post("/", usersCtrl.createUser);
router.post("/:id", usersCtrl.modifyUser);

module.exports = router;
