const ApiError = require('../apiError/ApiError');
const ratingsModels = require('../models/ratingsModels');

const createNewRating = async (req, res, next) => {
  const { movieId, rating } = req.body;
  const [responseObject, error] = await ratingsModels.SqlCreateRating([req.userId, movieId, rating]);

  if (error) {
    console.log('error in creating rating ===');
    return next(error);
  }

  if (responseObject.affectedRows !== 1) {
    return next(new ApiError('Something wrong with creating rating', 400));
  }
  console.log('responseObject ===', responseObject);
  return res.status(201).json({
    msg: `You just rated a movie ${rating} points!`,
  });
};

const getAllAveRatingsByMovie = async (req, res, next) => {
  const { movieId } = req.params;
  const [usersIFollowArr, error] = await ratingsModels.SqlGetRatingsByMovie([movieId]);

  if (error) {
    console.log('error in get all movie average rating ===');
    return next(error);
  }

  return res.json(usersIFollowArr[0]);
};

module.exports = {
  createNewRating,
  getAllAveRatingsByMovie,
};
