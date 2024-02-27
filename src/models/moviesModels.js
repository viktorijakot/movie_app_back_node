const { makeSqlQuery } = require('../helper');

const SqlAddMovieToUser = (userId, movieId, description, title, imgUrl) => {
  const sql = `
INSERT INTO movies (user_id, movie_id, description, title, imgUrl) VALUES
     (?,?,?,?,?)
`;
  return makeSqlQuery(sql, userId, movieId, description, title, imgUrl);
};

module.exports = {
  SqlAddMovieToUser,
};
