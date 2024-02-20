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

const getAllUsersSql = () => {
  const sql = `
    SELECT email, userName FROM users
    `;

  return makeSqlQuery(sql);
};

module.exports = {
  loginSql,
  registerSql,
  getAllUsersSql,
};
