// const bcrypt = require('bcryptjs');
const ApiError = require('../apiError/ApiError');
const { makeSqlQuery, makeJWTToken } = require('../helper');

module.exports = {
  login: async (req, res, next) => {
    console.log('req.body ===', req.body);
    // const { email, password } = req.body;

    // const sql = 'SELECT * FROM customers WHERE email=?';
    // const [rowsArr, error] = await makeSqlQuery(sql, [email]);

    // if (error) {
    //   console.log('login error ===', error);
    //   return next(error);
    // }

    // if (rowsArr.length === 0) {
    //   console.log('user not found ===');
    //   return next(new ApiError('Email was not found', 400));
    // }

    // const foundUserInDB = rowsArr[0];

    // const passwordHash = foundUserInDB.password;

    // if (!bcrypt.compareSync(password, passwordHash)) {
    //   return next(new ApiError('Password or email not match (pass not match)', 401));
    // }
    // // sekme
    // const token = makeJWTToken({ email, sub: foundUserInDB.id });
    // return res.json({
    //   msg: 'login success',
    //   token,
    // });
  },
  register: async (req, res, next) => {
    console.log('req.body ===', req.body);
    // const { email, password, userName } = req.body;
    // const sql = 'INSERT INTO `users` (`email`, `password`, `userName`) VALUES (?, ?)';
    // //   const passwordHash = bcrypt(hashSync(password));
    // //   const [resObj, error] = await makeSqlQuery(sql, [email, passwordHash, userName]);

    // if (error) {
    //   console.log('register error ===', error);
    //   next(error);
    //   // new APIError('too h', status, type)
    //   return;
    // }

    // // sekmingas yrasymas
    // if (resObj.affectedRows === 1) {
    //   res.status(201).json({
    //     msg: 'User is created',
    //     id: resObj.insertId,
    //   });
    // }

    // // kai uzklausa pavyko bet affectedRows !== 1
    // res.end();
  },
};
