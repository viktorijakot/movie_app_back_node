const express = require('express');
const moviesController = require('../controllers/moviesController');

const moviesRouter = express.Router();

moviesRouter.post('/myMoviesList', moviesController.addMovieToUser);
moviesRouter.delete('/myMoviesList/:id', moviesController.deleteMovieFromUser);
moviesRouter.get('/myMoviesList/:id', moviesController.getAllUsersMovies);

module.exports = moviesRouter;
