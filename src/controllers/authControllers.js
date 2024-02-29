const bcrypt = require('bcrypt');
const ApiError = require('../apiError/ApiError');
const { makeJWTToken } = require('../helper');
const authModels = require('../models/authModels');

const login = async (req, res, next) => {
  console.log('req.body ===', req.body);
  const { email, password } = req.body;
  const [rowsArr, error] = await authModels.loginSql([email]);

  if (error) {
    console.log('login error ===', error);
    return next(error);
  }

  if (rowsArr.length === 0) {
    console.log('user not found ===');
    return next(new ApiError('Email was not found', 400));
  }

  const foundUserInDB = rowsArr[0];

  const passwordHash = foundUserInDB.password;

  if (!bcrypt.compareSync(password, passwordHash)) {
    return next(new ApiError('Password or email not match', 401));
  }
  // const { userName } = rowsArr[0];

  const token = makeJWTToken({
    email, sub: foundUserInDB.id, userId: foundUserInDB.id, scope: foundUserInDB.scope, userName: foundUserInDB.userName, imgUrl: foundUserInDB.img_url,
  });
  console.log('token ===', foundUserInDB);
  return res.json({
    msg: `Welcome ${foundUserInDB.userName} !`,
    token,
  });
};

const register = async (req, res, next) => {
  console.log('req.body ===', req.body);
  const { email, password, userName } = req.body;

  const salt = process.env.SALT || 5;
  const passwordHash = bcrypt.hashSync(password, +salt);
  const [resObj, error] = await authModels.registerSql([email, passwordHash, userName]);

  if (error) {
    console.log('register error ===', error);
    next(error);
    return;
  }

  if (resObj.affectedRows === 1) {
    res.status(201).json({
      msg: 'User is created',
      id: resObj.insertId,
    });
  }

  res.end();
};

module.exports = {
  login,
  register,
};
