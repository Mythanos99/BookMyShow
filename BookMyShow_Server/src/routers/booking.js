const express = require("express");
const router = new express.Router();

const booking_controller = require("../controllers/booking");

router.post("/:id", booking_controller.bookShow);
router.post("/", booking_controller.bookSeat);
router.post("/event/:id", booking_controller.bookEvent);
router.get("/user/:id",booking_controller.getAllBookingsForUser);
router.get("/recent/:id",booking_controller.getRecentBookings);


module.exports = router;