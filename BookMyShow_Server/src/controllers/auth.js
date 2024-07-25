const auth_service = require("../services/auth");

function login(req, res) {
  res.setHeader('Content-Type', 'application/json');

  const { username, password } = req.body;

  auth_service.verify_login(username, password)
    .then(({ user, token }) => {
      // Set cookie with JWT token
      res.cookie("jwtToken", token, {
        httpOnly: true, // Ensures the cookie is sent only in HTTP(S) requests
        sameSite: "None", // Allows the cookie to be sent in third-party contexts
        secure: false, // Set to false for local development
        expires: new Date(Date.now() + 3600000), // Cookie expiration
        path: '/', // Ensures the cookie is accessible throughout the application
      });
//  #BUG- Cookie is being set in firefox but not in chrome. Check if. If not working then revert to local storage.
      // Send success response
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