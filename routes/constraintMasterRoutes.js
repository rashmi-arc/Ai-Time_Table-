const express = require("express");
const router = express.Router();
const controller = require("../controllers/constraintMasterController");

router.get("/", controller.getConstraintMaster);

module.exports = router;
