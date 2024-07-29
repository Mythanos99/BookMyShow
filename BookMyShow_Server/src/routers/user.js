const express = require("express");
const User = require("../models/user");
const router = new express.Router();
const user_controller = require("../controllers/user");
//Create a User
router.post("/",user_controller.createUser);
router.get("/:id",user_controller.getUserById);

// #TODO- add a middleware to check if the user is authenticated


module.exports = router;