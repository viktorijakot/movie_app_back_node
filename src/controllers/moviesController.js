const ApiError = require('../apiError/ApiError');
const moviesModels = require('../models/moviesModels');

const addMovieToUser = async (req, res, next) => {
  const { userId } = req;
  const {
    movieId, description, title, imgUrl,
  } = req.body;

  const [responseObject, error] = await moviesModels.SqlAddMovieToUser([userId, movieId, description, title, imgUrl]);

  if (error) {
    console.log('error in adding follow ===');
    return next(error);
  }

  if (responseObject.affectedRows !== 1) {
    return next(new ApiError('Something wrong with adding movie to the list', 400));
  }
  console.log('responseObject ===', responseObject);
  return res.status(201).json({
    msg: `You just added ${title} movie to your list`,
  });
};
module.exports = {
  addMovieToUser,
};
