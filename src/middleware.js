const jwt = require('jsonwebtoken');
const ApiError = require('./apiError/ApiError');
const { jwtSecret } = require('./config');

const mainErrroHandler = (errorGot, req, res, next) => {
  console.log('errorGot ===', errorGot);

  if (errorGot instanceof ApiError) {
    return res.status(errorGot.status).json({ error: errorGot.message });
  }

  if (errorGot?.code === 'ER_DUP_ENTRY') {
    return res.status(400).json({
      error: 'Email is already taken',
    });
  }

  return res.status(500).json({
    error: 'System errror',
  });
};
const validateToken = async (req, res, next) => {
  console.log('authoriz is in progress ===');
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) throw new ApiError('No token', 401);
    const decoded = jwt.verify(token, jwtSecret);
    console.log('decoded ===', decoded);
    req.userEmail = decoded.email;
    req.userId = decoded.userId;
    console.log('req.userEmail  ===', req.userEmail);
    console.log('req.userId ===', req.userId);
    next();
  } catch (error) {
    console.log('token authorization error ===');
    next(new ApiError('Unauthorized', 401));
  }
};

module.exports = {
  mainErrroHandler,
  validateToken,
};
