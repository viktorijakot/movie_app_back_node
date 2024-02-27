const express = require('express');
const relationsController = require('../controllers/relationsControllers');

const relationsRouter = express.Router();

relationsRouter.get('/relations/myfollows', relationsController.getAllUsersWhoIFollow);

relationsRouter.get('/relations/myfollowers', relationsController.getAllUsersWhoFollowsMe);

relationsRouter.post('/relations', relationsController.createNewFollowRelation);

relationsRouter.delete('/relations/:id', relationsController.updateFollow);

module.exports = relationsRouter;
