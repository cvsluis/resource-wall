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
const getAllPins = (categoryTitle) => {
  // Initialize an array to store the query parameters
  const queryParams = [];

  // Initialize the base query string that retrieves pin data along with owner names
  let queryString = `
    SELECT pins.id, pins.image, pins.title, pins.description, pins.image, users.name AS owner_name, users.id AS owner_id, categories.title AS category_title, AVG(ratings.rating) AS average_rating
    FROM pins
    JOIN users ON pins.owner_id = users.id
    LEFT JOIN categories ON pins.category_id = categories.id
    LEFT JOIN ratings ON pins.id = ratings.pin_id
  `;

  // Check if categoryTitle exists and add a WHERE clause to filter by it
  if (categoryTitle) {
    queryParams.push(`%${categoryTitle}%`);
    queryString += `WHERE categories.title ILIKE $${queryParams.length} `;
  }

  // Grouping the results by the pin id, owner name, and category title
  queryString += `
    GROUP BY pins.id, users.name, users.id, categories.title
    ORDER BY pins.created_at DESC;
  `;

  // Execute the query using db.query with the queryParams
  return db
    .query(queryString, queryParams)
    .then((result) => {
      return result.rows;
    });
};

// takes in user id
// return user's saved pins and liked pins in json format
const getUserPins = (userId) => {
  const query = `
  SELECT
  pins.id,
  pins.url,
  pins.title,
  pins.description,
  pins.image,
  users.name AS owner_name,
  users.id AS owner_id
FROM pins
JOIN users on pins.owner_id = users.id
WHERE pins.owner_id = $1

UNION

SELECT
  pins.id,
  pins.url,
  pins.title,
  pins.description,
  pins.image,
  users.name AS owner_name,
  users.id AS owner_id
FROM pins
JOIN likes ON pins.id = likes.pin_id
JOIN users on pins.owner_id = users.id
WHERE likes.owner_id = $1
  `;

  return db
    .query(query, [userId])
    .then((result) => {
      const pins = result.rows;
      if (!pins) {
        throw new Error('No pins found for this user');
      }

      return pins;
    });
};

// takes in pin id
// returns all information pertaining to that pin
// also comments, likes and ratings
const getOnePin = (pinId, userId) => {
  const queryString = `
  SELECT 
    pins.*, 
    avg_rating.average_rating, 
    categories.title as category_name,
    CASE 
        WHEN likes.id IS NULL THEN FALSE 
        ELSE TRUE 
    END AS user_has_liked
  FROM pins
  LEFT JOIN (
    SELECT pin_id, AVG(rating) AS average_rating
    FROM ratings
    GROUP BY pin_id
  ) AS avg_rating ON pins.id = avg_rating.pin_id
  LEFT JOIN likes ON pins.id = likes.pin_id AND likes.owner_id = $2
  JOIN categories ON categories.id = pins.category_id
  WHERE pins.id = $1;
`;

  return db
    .query(queryString, [pinId, userId])
    .then((result) => {
      return result.rows[0];
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
