const express = require("express");
const router = new express.Router();
const cinema_controller = require("../controllers/cinema.js");

router.get("/", cinema_controller.getAllcinemas);
router.get("/:city", cinema_controller.getAllcinemasByCity);

module.exports = router;