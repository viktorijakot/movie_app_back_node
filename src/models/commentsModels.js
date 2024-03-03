const { makeSqlQuery } = require('../helper');

const SqlAddnewComment = (userId, movieId, comment) => {
  const sql = `
  INSERT INTO comments (user_id, movie_id, comment) VALUES
       (?,?,?)
  `;
  return makeSqlQuery(sql, userId, movieId, comment);
};

const SqlGetAllCommentsByMovie = (movieId) => {
  const sql = `
    SELECT comments.id, comments.user_id, comments.created_at, comments.comment, users.userName, users.email, users.img_url, movies.description, movies.title, movies.imgUrl FROM comments 
    JOIN users
    ON comments.user_id=users.id
    JOIN movies
    ON movies.movie_id=comments.movie_id
    WHERE comments.movie_id=?
    `;
  return makeSqlQuery(sql, movieId);
};

const SqlDeleteComment = (id) => {
  const sql = `
  DELETE FROM comments WHERE id=?
  `;
  return makeSqlQuery(sql, id);
};

module.exports = {
  SqlAddnewComment,
  SqlGetAllCommentsByMovie,
  SqlDeleteComment,
};
