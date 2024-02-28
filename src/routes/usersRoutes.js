const express = require('express');
const multer = require('multer');
const usersController = require('../controllers/usersControllers');

const usersRouter = express.Router();

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'src/public/images/'); // Ensure this folder exists
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
    cb(null, `${file.originalname.split('.').shift()}-${uniqueSuffix}.${file.originalname.split('.').pop()}`);
  },
});

const upload = multer({ storage });

usersRouter.get('/users', usersController.getAllUsers);

usersRouter.put('/users/:id', upload.single('file'), usersController.updateUser);
module.exports = usersRouter;
