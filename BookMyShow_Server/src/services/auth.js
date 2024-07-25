const User = require("../models/user");
const utils = require("../utils/utils");
const jwt = require("jsonwebtoken");

function verify_login(username, password) {
  return User.findOne({ username: username }) // Assuming username field stores username
    .then(user => {
      if (!user) {
        throw new Error("Invalid username");
      }
      return utils.comparePassword(password, user.password)
        .then(isMatch => {
          if (!isMatch) {
            throw new Error("Invalid password");
          }

          // Generate JWT token after successful authentication
          const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: "1h",
          });

          return {
            user: { id: user._id, username: user.username },
            token,
          };
        });
    });
}

module.exports = { verify_login };
