const express = require("express");
const router = new express.Router();
const event_controller = require("../controllers/event");

router.get("",event_controller.getFilteredEvents);
router.get("/:id",event_controller.getEventById);

module.exports = router;