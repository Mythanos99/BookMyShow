const express = require("express");
const User = require("../models/user");
const router = new express.Router();
const user_controller = require("../controllers/user");
const auth_middleware = require("../middlewares/auth");
//Create a User
router.post("/",user_controller.createUser);
router.get("/:id",auth_middleware.authenticateToken,user_controller.getUserById);
router.put("/:id",user_controller.updateUserById);

// #TODO- add a middleware to check if the user is authenticated


module.exports = router;