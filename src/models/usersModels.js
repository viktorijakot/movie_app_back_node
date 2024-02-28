const { makeSqlQuery } = require('../helper');

const getAllUsersSql = () => {
  const sql = `
      SELECT id, email, userName, img_url FROM users
      `;

  return makeSqlQuery(sql);
};

const SqlUpdateUser = (userName, imgUrl, userId) => {
  const sql = `
UPDATE users SET userName = ?, img_url = ? WHERE id = ?
    `;
  return makeSqlQuery(sql, userName, imgUrl, userId);
};

module.exports = {
  getAllUsersSql,
  SqlUpdateUser,
};
