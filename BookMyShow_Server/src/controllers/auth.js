const auth_service = require('../services/auth');

function login(req,res){
    auth_service.verify_login(req,res);
}

module.exports = {login}