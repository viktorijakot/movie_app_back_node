const express = require('express');
const usersController = require('../controllers/usersControllers');

const usersRouter = express.Router();

usersRouter.get('/users', usersController.getAllUsers);

module.exports = usersRouter;
