const express = require("express");
const router = new express.Router();
const rating_controller = require("../controllers/rating");

router.post("/add-rating",rating_controller.addRating);
router.get("/movie/:id",rating_controller.getRatingByMovieId);
module.exports = router;