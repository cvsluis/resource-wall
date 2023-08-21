const db = require('../connection');

const getUsers = () => {
  return db.query('SELECT * FROM users;')
    .then(data => {
      return data.rows;
    });
};

// model after LightBnB getAllProperties
// check for categories, ratings
// potential second parameter
const getAllPins = (options) => {
  // Initialize an array to store the query parameters
  const queryParams = [];

  // Initialize the base query string that retrieves pin data along with owner names
  let queryString = `
  SELECT title, description, image, users.name AS owner_name
  FROM pins
  join users on pins.owner_id = users.id;`;

  // Execute the query using db.query with the queryParams
  return db
    .query(queryString, queryParams)
    .then((result) => {
      return result.rows;
    });
};


// ––––––––––––––– COMMENTING OUT FOR NOW – RETURN TO THIS FUNCTION LATER ––––––––––––––– //

// const getAllPins = (options) => {
//   // Initialize an array to store the query parameters
//   const queryParams = [];

//   // Initialize the base query string that retrieves pin data along with owner names
//   let queryString = `
//     SELECT pins.title, pins.description, pins.image, users.name AS owner_name,
//     categories.title AS category_title, AVG(ratings.rating) AS average_rating
//     FROM pins
//     JOIN users ON pins.owner_id = users.id
//     LEFT JOIN categories ON pins.category_id = categories.id
//     LEFT JOIN ratings ON pins.id = ratings.pin_id`;

//   // Initialize arrays to store WHERE and HAVING clauses
//   const whereClauses = [];
//   const havingClauses = [];

//   // Check options and build clauses and queryParams accordingly
//   if (options.category) {
//     queryParams.push(options.category);
//     whereClauses.push(`categories.title = $${queryParams.length}`);
//   }

//   // Check if the 'minimum_rating' option is provided
//   if (options.minimum_rating) {
//     queryParams.push(options.minimum_rating);
//     havingClauses.push(`average_rating >= $${queryParams.length}`);
//   }

//   // Build the WHERE part of the query if there are clauses
//   if (whereClauses.length > 0) {
//     queryString += ' WHERE ';
//     queryString += whereClauses.join(' AND ');
//   }

//   // GROUP BY clause
//   queryString += `
//     GROUP BY pins.id`;

//   // Build the HAVING part of the query if there are clauses
//   if (havingClauses.length > 0) {
//     queryString += ' HAVING ';
//     queryString += havingClauses.join(' AND ');
//   }

//   // Finalize the query
//   queryString += ';';

//   // Execute the query using db.query with the queryParams
//   return db
//     .query(queryString, queryParams)
//     .then((result) => {
//       return result.rows;
//     });
// };

// –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––– //


// takes in user id
// return user's saved pins and liked pins in json format
const getUserPins = (userId) => {

};

// takes in pin id
// returns all information pertaining to that pin
// also comments, likes and ratings
const getOnePin = (pinId) => {
  const queryString = `
  SELECT pins.*, avg_rating.average_rating, comments.description, comments.created_at
  FROM pins
  LEFT JOIN (
    SELECT pin_id, description, created_at
    FROM comments
    WHERE pin_id = $1
    ORDER BY created_at
  ) AS comments ON pins.id = comments.pin_id
  LEFT JOIN (
    SELECT pin_id, AVG(rating) AS average_rating
    FROM ratings
    GROUP BY pin_id
  ) AS avg_rating ON pins.id = avg_rating.pin_id
  WHERE pins.id = $1;
`;

  return db
    .query(queryString, [pinId])
    .then((result) => {
      return result.rows;
    });
};

// model this function after LightBnB addProperty
// takes in an object containing all of the pin details
// returns result.rows
const addOnePin = (pin) => {
  const queryParams = [
    pin.owner_id,
    pin.category_id,
    pin.url,
    pin.title,
    pin.description,
  ];
  const queryString = `
  INSERT INTO pins (owner_id, category_id, url, title, description)
  VALUES ($1, $2, $3, $4, $5)
  RETURNING *;`;

  return db
    .query(queryString, queryParams)
    .then((result) => {
      return result.rows;
    });
};

module.exports = { getAllPins, getUserPins, getOnePin, addOnePin };
