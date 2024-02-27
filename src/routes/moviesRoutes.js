const express = require('express');
const moviesController = require('../controllers/moviesController');

const moviesRouter = express.Router();

moviesRouter.post('/myMoviesList', moviesController.addMovieToUser);
module.exports = moviesRouter;
