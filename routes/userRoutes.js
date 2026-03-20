const express = require("express");
const router = express.Router();

const {
  addUser,
  getUsers,
  deleteUser,
  getTeachersByDept
} = require("../controllers/userController");

const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");

// 🔒 ADMIN only
router.post("/add", auth, role("ADMIN"), addUser);

// 🔒 ADMIN only
router.get("/", auth, role("ADMIN"), getUsers);

// 🔒 ADMIN only
router.delete("/:id", auth, role("ADMIN"), deleteUser);

// 🔒 protected
router.get("/teachers/:deptId", auth, getTeachersByDept);

module.exports = router;