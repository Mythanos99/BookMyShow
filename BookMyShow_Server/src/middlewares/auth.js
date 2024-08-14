const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) { 
  res.setHeader('Content-Type', 'application/json');
  // console.log(req);
  // console.log(req.cookies);
  const token = req.cookies.jwtToken;
  if (token == null) {
    return res.status(401).json({ message: "Authentication token missing" });
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      console.log(err);
      return res.status(401).json({ message: "Invalid token" });
    }
    req.user = user;
    next();
  });
}

module.exports = { authenticateToken };

// #TODO check the status code for the errors and give accordingly.