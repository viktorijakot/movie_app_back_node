require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const multer = require('multer');

const authRouter = require('./routes/authRoutes');
const { mainErrroHandler, validateToken } = require('./middleware');
const usersRouter = require('./routes/usersRoutes');
const relationsRouter = require('./routes/relationsRoutes');
const moviesRouter = require('./routes/moviesRoutes');
const commentsRouter = require('./routes/commentsRoutes');

const app = express();

const port = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());
app.use(express.static(`${__dirname}/public`));

app.get('/', (req, res) => {
  res.json('Hello World!');
});

app.use('/api', authRouter);
app.use('/api', validateToken, usersRouter);
app.use('/api', relationsRouter);
app.use('/api', moviesRouter);
app.use('/api', commentsRouter);

app.use(mainErrroHandler);

app.use((req, res) => {
  res.status(404).json({
    error: 'Page was not found',
  });
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
