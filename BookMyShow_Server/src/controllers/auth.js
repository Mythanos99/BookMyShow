const auth_service = require("../services/auth");

function login(req, res) {
  res.setHeader('Content-Type', 'application/json');

  const { username, password } = req.body;

  auth_service.verify_login(username, password)
    .then(({ user, token }) => {
      // Set cookie with JWT token
      res.cookie("jwtToken", token, {
        httpOnly: false, // Ensures the cookie is sent only in HTTP(S) requests
        sameSite: "None", 
        secure: false, // Set to false for local development
        expires: new Date(Date.now() + 3600000), // Cookie expiration
        path: '/', // Ensures the cookie is accessible throughout the application
      });
      res.status(200).json({
        message: "Login successful",
        user,
      });
    })
    .catch(error => {
      // Send error response
      res.status(401).json({ message: error.message });
    });
}

module.exports = { login };

// #BUG- cookie not working