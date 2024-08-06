const express = require("express");
const router = new express.Router();

const booking_controller = require("../controllers/booking");

router.post("/:id", booking_controller.bookShow);
router.post("/", booking_controller.bookSeat);

module.exports = router;