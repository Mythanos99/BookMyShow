
const User = require('../models/user');
const utils = require('../utils/utils'); 

async function createUser(data) {
  const { username, mobile_no, password, address, personal_details, role } = data;

  return utils.hashPassword(password)
    .then(hashedPassword => {
      const newUser = new User({
        username,
        mobile_no,
        password: hashedPassword,
        role: role || 'user',
        address: address || {},
        personal_details: personal_details || {},
      });

      return newUser.save();
    });
}

async function ifUserExists(username) {
  return User.findOne({ username: username })
    .then(user => {
      if (user) {
        return true;
      }
      return false;
    });
}

module.exports = { createUser , ifUserExists};
