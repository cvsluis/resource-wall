const db = require('../connection');

// example function for reference
const getUsers = () => {
  return db.query('SELECT * FROM users;')
    .then(data => {
      return data.rows;
    });
};


// takes in an object containing all of the comment details
// returns result.rows
const addComment = (owner_id, comment) => {

};

// takes in an object containing all of the rating details
// returns result.rows
const addRating = (rating) => {

};

// takes in an object containing all of the rating details
// returns result.rows
const addLike = (like) => {

};

// takes in an object containing all of the rating details
// returns result.rows
const removeLike = (like) => {

};


module.exports = { getPinComments, addComment, getPinRating, addRating, addLike, removeLike };
