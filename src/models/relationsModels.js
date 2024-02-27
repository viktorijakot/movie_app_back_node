const { makeSqlQuery } = require('../helper');

const SQLgetAllUsersWhoIFollow = (userId) => {
  const sql = `
  SELECT id, email, userName FROM users u WHERE EXISTS ( SELECT * FROM relations r WHERE r.follows = u.id AND r.user_id = ?);
      `;

  return makeSqlQuery(sql, userId);
};

const SQLgetAllWhoFollowsMe = (userId) => {
  const sql = `
    SELECT id, email, userName FROM users u
WHERE EXISTS ( SELECT * FROM relations r WHERE r.user_id = u.id AND r.follows = ?);
    `;

  return makeSqlQuery(sql, userId);
};

const SQLaddnewFollow = (userId, follows) => {
  const sql = `
INSERT INTO relations (user_id, follows) VALUES
     (?,?)
`;
  return makeSqlQuery(sql, userId, follows);
};

const SQLDeleteFollow = (userId) => {
  const sql = `
DELETE FROM relations WHERE follows=?
`;
  return makeSqlQuery(sql, userId);
};

module.exports = {
  SQLgetAllUsersWhoIFollow,
  SQLgetAllWhoFollowsMe,
  SQLaddnewFollow,
  SQLDeleteFollow,
};
