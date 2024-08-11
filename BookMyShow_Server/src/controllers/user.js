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
async function getUserById(req, res) {
  res.setHeader('Content-Type', 'application/json');
  try{
    const id=req.params.id;
    const user=await user_service.getById(id);
    return res.status(200).json(user);
  } catch (error) {
    console.error("Error getting user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function updateUserById(req, res) {
  res.setHeader('Content-Type', 'application/json');
  try{
    const id=req.params.id;
    const data=req.body;
    const user=await user_service.updateById(id,data);
    return res.status(200).json(user);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = { createUser , getUserById,updateUserById};

// #FIXME- change the .then .catch to async await