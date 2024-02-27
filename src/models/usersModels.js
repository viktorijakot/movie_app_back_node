const { makeSqlQuery } = require('../helper');

const getAllUsersSql = () => {
  const sql = `
      SELECT id, email, userName FROM users
      `;

  return makeSqlQuery(sql);
};

module.exports = {
  getAllUsersSql,
};
