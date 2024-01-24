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

  const token = makeJWTToken({ email, sub: foundUserInDB.id });
  return res.json({
    msg: 'login success',
    token,
  });
};

const register = async (req, res, next) => {
  console.log('req.body ===', req.body);
  const { email, password, userName } = req.body;
  const passwordHash = bcrypt.hashSync(password, 10);
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
