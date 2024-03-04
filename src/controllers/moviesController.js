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

const deleteMovieFromUser = async (req, res, next) => {
  const { id } = req.params;
  console.log('userId ===', id);
  const [responseObject, error] = await moviesModels.SqlRemoveMovieFromUser([id]);

  if (error) {
    console.log('error in delete movie from user ===');
    return next(error);
  }

  if (responseObject.affectedRows !== 1) {
    return next(new ApiError('Something wrong with removing movie from user', 400));
  }
  console.log('responseObject ===', responseObject);
  return res.status(201).json({
    msg: 'You just removed movie from your movie list ',
  });
};

const getAllUsersMovies = async (req, res, next) => {
  const { id } = req.params;
  console.log('userId ===', id);
  const [moviesArr, error] = await moviesModels.SqlGetAllUsersMovies([id]);

  if (error) {
    console.log('error in get all users movies ===');
    return next(error);
  }

  return res.json(moviesArr);
};

const getAllUsersByLikedMovies = async (req, res, next) => {
  const { movieId } = req.params;
  const [moviesArr, error] = await moviesModels.SqlGetAllUsersBylikedMovie([movieId]);

  if (error) {
    console.log('error in get all liked movies ===');
    return next(error);
  }
  return res.json(moviesArr);
};
module.exports = {
  addMovieToUser,
  deleteMovieFromUser,
  getAllUsersMovies,
  getAllUsersByLikedMovies,
};
