const user_service = require('../services/user');

function createUser(req, res) {
  res.setHeader('Content-Type', 'application/json');

  const userData = req.body;
  console.log(userData);
  user_service.ifUserExists(userData.username)
    .then((exists) => {
      if (exists) {
        return res.status(400).json({ message: "User already exists" });
      } else {
        return user_service.createUser(userData)
          .then(user => {
            res.status(201).json({
              message: "User created successfully",
              user: {
                id: user._id,
                username: user.username,
                mobile_no: user.mobile_no,
              },
            });
          });
      }
    })
    .catch(error => {
      console.error("Error processing request:", error);
      res.status(500).json({ message: "Internal server error" });
    });
}

module.exports = { createUser };