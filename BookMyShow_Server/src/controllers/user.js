const user_service = require('../services/user');

function createUser(req, res) {
  res.setHeader('Content-Type', 'application/json');

  const userData = req.body;
  // console.log(userData);
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
      //#TODO- in this case, we should log the error to a file. Also take help of a logger library like winston. Take help of acknowledgement flag from the db
    });
}
function getUserById(req, res) {
  res.setHeader('Content-Type', 'application/json');
  const userId = req.params.id;
  user_service.getUserById(userId)
    .then(user => {
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json({
        
      });
    })
    .catch(error => {
      console.error("Error processing request:", error);
      res.status(500).json({ message: "Internal server error" });
    });
}

module.exports = { createUser , getUserById};