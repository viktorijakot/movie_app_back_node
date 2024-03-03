const express = require('express');
const commentsController = require('../controllers/commentsController');

const commentsRouter = express.Router();

commentsRouter.post('/comments', commentsController.createNewComment);
commentsRouter.get('/comments/:movieId', commentsController.getAllCommentsByMovie);
commentsRouter.delete('/comments/:id', commentsController.delteComment);
module.exports = commentsRouter;
