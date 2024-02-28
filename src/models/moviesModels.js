const { makeSqlQuery } = require('../helper');

const SqlAddMovieToUser = (userId, movieId, description, title, imgUrl) => {
  const sql = `
INSERT INTO movies (user_id, movie_id, description, title, imgUrl) VALUES
     (?,?,?,?,?)
`;
  return makeSqlQuery(sql, userId, movieId, description, title, imgUrl);
};

const SqlRemoveMovieFromUser = (movieId) => {
  const sql = `   
DELETE FROM movies WHERE movie_id=?
`;
  return makeSqlQuery(sql, movieId);
};

const SqlGetAllUsersMovies = (userId) => {
  const sql = `
    SELECT * FROM movies WHERE user_id=?
        `;

  return makeSqlQuery(sql, userId);
};

module.exports = {
  SqlAddMovieToUser,
  SqlRemoveMovieFromUser,
  SqlGetAllUsersMovies,
};
