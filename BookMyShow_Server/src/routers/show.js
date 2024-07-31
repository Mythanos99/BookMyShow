const express = require("express");
const router = new express.Router();
const show_controller = require("../controllers/show");

router.get("/:id",show_controller.getShowByMovieId);

module.exports = router;
