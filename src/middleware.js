const mainErrroHandler = (errorGot, req, res, next) => {
  console.log('errorGot ===', errorGot);

  if (errorGot?.code === 'ER_DUP_ENTRY') {
    return res.status(400).json({
      error: 'Email is already taken',
    });
  }

  return res.status(500).json({
    error: 'System errror',
  });
};

module.exports = {
  mainErrroHandler,
};
