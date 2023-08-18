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

};

// takes in user id
// return user's saved pins and liked pins in json format
const getUserPins = (userId) => {

};

// takes in user id and user object with any changes
// returns confirmation message? (Changes saved successfully! or Failed to update.)
const editUserProfile = (id, userProfileChange) => {

};

module.exports = { getUserProfile, editUserProfile };
