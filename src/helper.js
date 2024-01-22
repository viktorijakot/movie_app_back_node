const mysql = require('mysql2/promise');
const jwt = require('jsonwebtoken');
const { dbConfig, jwtSecret } = require('./config');

async function makeSqlQuery(sql, argArr = []) {
  let connection;
  try {
    connection = await mysql.createConnection(dbConfig);
    const [rows] = await connection.execute(sql, argArr);
    return [rows, null];
  } catch (error) {
    console.log('error ===', error);
    return [null, error];
  } finally {
    connection?.end();
    console.log('after connection end');
  }
}

function makeJWTToken(data) {
  if (!jwtSecret) throw new Error('no secret provided');
  return jwt.sign(data, jwtSecret, { expiresIn: '1h' });
}

module.exports = {
  makeSqlQuery,
  makeJWTToken,
};
