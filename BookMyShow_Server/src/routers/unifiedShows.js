const express = require("express");
const router = new express.Router();

const unifiedShows_controller = require("../controllers/unifiedShows");

router.get('/:id',unifiedShows_controller.getUnifiedShowsById);
router.get('/event/:id',unifiedShows_controller.getUnifiedShowsByEventId);

module.exports = router;