const ApiError = require('../apiError/ApiError');
const relationsModels = require('../models/relationsModels');

const getAllUsersWhoIFollow = async (req, res, next) => {
  const [usersFollowsArr, error] = await relationsModels.SQLgetAllUsersWhoIFollow([req.userId]);

  if (error) {
    console.log('error in get all users ===');
    return next(error);
  }

  return res.json(usersFollowsArr);
};

const getAllUsersWhoFollowsMe = async (req, res, next) => {
  const [usersIFollowArr, error] = await relationsModels.SQLgetAllWhoFollowsMe([req.userId]);

  if (error) {
    console.log('error in get all users ===');
    return next(error);
  }

  return res.json(usersIFollowArr);
};

const createNewFollowRelation = async (req, res, next) => {
  const { follows, userName } = req.body;
  const [responseObject, error] = await relationsModels.SQLaddnewFollow([req.userId, follows]);

  if (error) {
    console.log('error in adding follow ===');
    return next(error);
  }

  if (responseObject.affectedRows !== 1) {
    return next(new ApiError('Something wrong with adding a follow', 400));
  }
  console.log('responseObject ===', responseObject);
  return res.status(201).json({
    msg: `You just followed ${userName}`,
  });
};

const updateFollow = async (req, res, next) => {
  const { id } = req.params;
  console.log('userId ===', id);
  const [responseObject, error] = await relationsModels.SQLDeleteFollow([id]);

  if (error) {
    console.log('error in adding follow ===');
    return next(error);
  }

  if (responseObject.affectedRows !== 1) {
    return next(new ApiError('Something wrong with unfollow', 400));
  }
  console.log('responseObject ===', responseObject);
  return res.status(201).json({
    msg: 'You just unfollowed ',
  });
};

module.exports = {
  getAllUsersWhoFollowsMe,
  getAllUsersWhoIFollow,
  createNewFollowRelation,
  updateFollow,
};
