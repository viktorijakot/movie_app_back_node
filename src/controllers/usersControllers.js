const usersModels = require('../models/usersModels');

const getAllUsers = async (req, res, next) => {
  const [usersArr, error] = await usersModels.getAllUsersSql();

  if (error) {
    console.log('error in get all users ===');
    return next(error);
  }

  return res.json(usersArr);
};
// const getSingleUser = async (req, res, next) => {

// };
module.exports = {
  getAllUsers,
};
