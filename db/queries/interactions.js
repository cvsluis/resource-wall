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
const addComment = (comment) => {
  const queryString = `
    INSERT INTO comments (pin_id, owner_id, description)
    VALUES ($1, $2, $3)
    RETURNING *;
  `;

  return db
    .query(queryString, [comment.pin_id, comment.owner_id, comment.description])
    .then(data => data.rows);
};

// takes in an object containing all of the rating details
// returns result.rows
const addRating = (rating) => {
  const queryParams = [rating.pin_id, rating.owner_id, rating.value];

  const queryString = `
    INSERT INTO ratings (pin_id, owner_id, rating)
    VALUES ($1, $2, $3);
  `;

  return db
    .query(queryString, queryParams)
    .then((result) => {
      return result.rows;
    });
};

// takes in an object containing all of the rating details
// returns result.rows
const addLike = (like) => {
  const queryParams = [like.pin_id, like.owner_id];

  const queryString = `
    INSERT INTO likes (pin_id, owner_id)
    VALUES ($1, $2);
  `;

  return db
    .query(queryString, queryParams)
    .then((result) => {
      return result.rows;
    });
};

// takes in an object containing all of the rating details
// returns result.rows
const removeLike = (unlike) => {
  const queryParams = [unlike.pin_id, unlike.owner_id];

  const queryString = `
    DELETE FROM likes
    WHERE pin_id = $1 AND owner_id = $2;
  `;

  return db
    .query(queryString, queryParams)
    .then((result) => {
      return result.rows;
    });
};


module.exports = { getAllCategories, getComments, addComment, addRating, addLike, removeLike };
