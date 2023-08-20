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
    SELECT id, name, email, username, about_me 
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

};

module.exports = { getUserProfile, editUserProfile };
