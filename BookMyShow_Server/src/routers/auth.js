const express = require('express');
const routers = express.Router();
const auth_controller = require('../controllers/auth');

routers.post('/',auth_controller.login);

module.exports = routers;