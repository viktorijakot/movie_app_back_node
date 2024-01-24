const { makeSqlQuery } = require('../helper');

const loginSql = (data) => {
  const sql = `
  SELECT * FROM users WHERE email=?
  `;

  return makeSqlQuery(sql, data);
};

const registerSql = (data) => {
  const sql = `
    INSERT INTO users (email, password, userName) VALUES (?, ?, ?)
    `;

  return makeSqlQuery(sql, data);
};

module.exports = {
  loginSql,
  registerSql,
};
