const express = require("express");
const newsController = require("../controller/newsController");

const router = express.Router();

router.post("/createNews",newsController.createNews);
router.get("/getAllNews",newsController.getAllNews);
router.get("/getSingleNews/:id",newsController.getSingleNews);

module.exports = router;