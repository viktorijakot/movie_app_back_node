const { makeSqlQuery } = require('../helper');

const getAllUsersSql = () => {
  const sql = `
      SELECT email, userName FROM users
      `;

  return makeSqlQuery(sql);
};

module.exports = {
  getAllUsersSql,
};
