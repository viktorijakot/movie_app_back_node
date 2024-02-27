const express = require('express');
const relationsController = require('../controllers/relationsControllers');

const relationsRouter = express.Router();

relationsRouter.get('/relations/myfollowers', relationsController.getAllWhoFollowsMe);

relationsRouter.get('/relations/myfollows', relationsController.getAllUsersWhoFollowI);

relationsRouter.post('/relations', relationsController.createNewFollowRelation);

module.exports = relationsRouter;
