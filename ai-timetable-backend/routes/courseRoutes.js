const router = require("express").Router();
const controller = require("../controllers/courseController");

router.post("/add", controller.addCourse);
router.get("/", controller.getCourses);

module.exports = router;
