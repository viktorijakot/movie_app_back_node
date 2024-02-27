const ApiError = require('../apiError/ApiError');
const relationsModels = require('../models/relationsModels');

const getAllWhoFollowsMe = async (req, res, next) => {
  const [usersFollowsArr, error] = await relationsModels.SQLgetAllWhoFollowsMe([req.userId]);

  if (error) {
    console.log('error in get all users ===');
    return next(error);
  }

  return res.json(usersFollowsArr);
};

const getAllUsersWhoFollowI = async (req, res, next) => {
  const [usersIFollowArr, error] = await relationsModels.SQLgetAllUsersWhoIFollow([req.userId]);

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

module.exports = {
  getAllWhoFollowsMe,
  getAllUsersWhoFollowI,
  createNewFollowRelation,
};
