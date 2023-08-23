const db = require('../connection');

// example function for reference
const getUsers = () => {
  return db.query('SELECT * FROM users;')
    .then(data => {
      return data.rows;
    });
};

// returns all categories
const getAllCategories = () => {
  return db.query('SELECT id, title FROM categories').then(data => data.rows);
};

const getComments = (pinId) => {
  const queryString = `
  SELECT *, users.name as name
  FROM comments
  JOIN users on users.id = comments.owner_id
  WHERE pin_id = $1
  ORDER BY comments.created_at;`;

  return db.query(queryString, [pinId]).then(data => data.rows);
};

// takes in an object containing all of the comment details
// returns result.rows
const addComment = (owner_id, comment) => {

};

// takes in an object containing all of the rating details
// returns result.rows
const addRating = (owner_id, rating) => {

};

// takes in an object containing all of the rating details
// returns result.rows
const addLike = (owner_id, like) => {

};

// takes in an object containing all of the rating details
// returns result.rows
const removeLike = (owner_id, like) => {

};


module.exports = { getAllCategories, getComments, addComment, addRating, addLike, removeLike };
