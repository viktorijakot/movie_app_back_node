const bcrypt = require('bcrypt');
const ApiError = require('../apiError/ApiError');
const usersModels = require('../models/usersModels');
const { makeJWTToken } = require('../helper');

const getAllUsers = async (req, res, next) => {
  const [usersArr, error] = await usersModels.getAllUsersSql();

  if (error) {
    console.log('error in get all users ===');
    return next(error);
  }

  return res.json(usersArr);
};
const updateUser = async (req, res, next) => {
  const { id } = req.params;
  const {
    userName,
  } = req.body;
  console.log('data==', id, userName);
  //   const salt = process.env.SALT || 5;
  //   const passwordHash = bcrypt.hashSync(password, +salt);
  const [respObj, error] = await usersModels.SqlUpdateUser([userName, req?.file?.path ? `images/${req.file.filename}` : '', id]);

  if (error) {
    return next(error);
  }

  if (respObj.affectedRows !== 1) {
    return next(new ApiError('Something wrong with user update', 400));
  }
  const token = makeJWTToken({
    email: req.userEmail, sub: req.userId, userId: req.userId, scope: req.scope, userName, imgUrl: req?.file?.path ? `images/${req.file.filename}` : '',
  });
  console.log('token ===', token);
  console.log('req ===', req);
  return res.json({
    msg: `${userName}, your profile was updated successfully!`,
    token,

  });
};
module.exports = {
  getAllUsers,
  updateUser,
};
