const express = require("express");
const User = require("../models/user");
const router = new express.Router();
const user_controller = require("../controllers/user");
//Create a User
router.post("/",user_controller.createUser);


module.exports = router;