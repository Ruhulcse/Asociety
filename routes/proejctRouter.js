const express = require("express");
const proejctController = require("../controller/ProjectController");

const router = express.Router();

router.post("/createProejct", proejctController.createProject);
router.get("/getAllProject",proejctController.getAllProjects);

module.exports = router;
