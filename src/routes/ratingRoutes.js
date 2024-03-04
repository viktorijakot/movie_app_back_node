const express = require('express');
const ratingController = require('../controllers/ratingsControllers');

const ratingRouter = express.Router();

ratingRouter.post('/ratings', ratingController.createNewRating);
ratingRouter.get('/ratings/:movieId', ratingController.getAllAveRatingsByMovie);
module.exports = ratingRouter;
