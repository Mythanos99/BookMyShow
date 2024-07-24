const utils=require('../utility/utils')
const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
    const token = req.cookies.jwtToken;
    if (token == null) return res.sendStatus(401).send({message:"Authentication token missing"});
  
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) return res.sendStatus(401).send({message:"Invalid token"});
      req.user = user;
      next();
    });
  }

module.exports = {authenticateToken}

// #TODO check the status code for the errors and give accordingly.
