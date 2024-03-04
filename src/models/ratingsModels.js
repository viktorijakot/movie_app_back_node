const { makeSqlQuery } = require('../helper');

const SqlCreateRating = (userId, movieId, rating) => {
  const sql = `
    INSERT INTO ratings (user_id, movie_id, rating) VALUES
    (?,?,?)
          `;

  return makeSqlQuery(sql, userId, movieId, rating);
};

const SqlGetRatingsByMovie = (movieId) => {
  const sql = `
    SELECT CAST(AVG(rating) AS DECIMAL(5, 2)) as avgRating, COUNT(user_id) as users FROM ratings WHERE movie_id=?
    `;
  return makeSqlQuery(sql, movieId);
};

module.exports = {
  SqlCreateRating,
  SqlGetRatingsByMovie,
};
