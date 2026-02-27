const express = require("express");
const router = express.Router();
const { getTeachersByDept } = require("../controllers/userController");

router.get("/teachers/:deptId", getTeachersByDept);

module.exports = router;
