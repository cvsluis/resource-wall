const db = require('../connection');

const getUsers = () => {
  return db.query('SELECT * FROM users;')
    .then(data => {
      return data.rows;
    });
};

// takes in user id
// return user information in json format
const getUserProfile = (userID) => {
  // Use SQL query to fetch the user's profile data by ID
  const query = `
    SELECT id, name, pronouns, email, username, about_me
    FROM users
    WHERE id = $1
  `;

  return db
    .query(query, [userID])
    .then((result) => {
      const user = result.rows[0];
      if (!user) {
        throw new Error('User not found');
      }

      return user;
    });
};

// takes in user id and user object with any changes
// returns confirmation message? (Changes saved successfully! or Failed to update.)
const editUserProfile = (id, userProfileChange) => {
  const queryParams = [
    userProfileChange.firstName,
    userProfileChange.pronouns,
    userProfileChange.about,
    userProfileChange.username,
    id
  ];

  const queryString = `
    UPDATE users
    SET
      name = $1,
      pronouns = $2,
      about_me = $3,
      username = $4
    WHERE id = $5
    RETURNING *;`;

  return db
    .query(queryString, queryParams)
    .then((result) => {
      return result.rows[0];
    });
};

module.exports = { getUserProfile, editUserProfile };
