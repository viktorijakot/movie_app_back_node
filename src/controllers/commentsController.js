const ApiError = require('../apiError/ApiError');
const commentsModels = require('../models/commentsModels');

const createNewComment = async (req, res, next) => {
  const { movieId, comment } = req.body;
  console.log('data===', movieId, comment, req.userId);
  const [responseObject, error] = await commentsModels.SqlAddnewComment([req.userId, movieId, comment]);

  if (error) {
    console.log('error in adding a comment ===');
    return next(error);
  }

  if (responseObject.affectedRows !== 1) {
    return next(new ApiError('Something wrong with adding a comment', 400));
  }
  console.log('responseObject ===', responseObject);
  return res.status(201).json({
    msg: 'Your comment was added successfully',
    id: responseObject.insertId,
  });
};

const getAllCommentsByMovie = async (req, res, next) => {
  const { movieId } = req.params;
  const [commentsArr, error] = await commentsModels.SqlGetAllCommentsByMovie([movieId]);

  if (error) {
    console.log('error in get all movie comments ===');
    return next(error);
  }

  return res.json(commentsArr);
};

const delteComment = async (req, res, next) => {
  const { id } = req.params;
  const [responseObject, error] = await commentsModels.SqlDeleteComment([id]);

  if (error) {
    console.log('error in deleting a comment ===');
    return next(error);
  }

  if (responseObject.affectedRows !== 1) {
    return next(new ApiError('Something wrong with deleting a comment', 400));
  }
  console.log('responseObject ===', responseObject);
  return res.status(201).json({
    msg: 'You just deleted a comment',
  });
};
module.exports = {
  createNewComment,
  getAllCommentsByMovie,
  delteComment,
};
