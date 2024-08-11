
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

async function getById(id) {
  try {
    const user = await User.findById(id, { password: 0, createdAt: 0, updatedAt: 0 ,__v:0});
    return user;
  } catch (error) {
    throw new Error('Error getting user');
  }
}
async function updateById(id,data) {
  try{
    const user=await User.updateOne({_id:id},data);
    return user; 
    // #TODO- here see what we need to return. A successful message may be
  } catch (error) {
    throw new Error('Error updating user');
  }
}



module.exports = { createUser , ifUserExists,getById,updateById};
// #FIXME- change the .then .catch to async await
// #