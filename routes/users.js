/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();
const userQueries = require('../db/queries/users');
const pinQueries = require('../db/queries/pins');

// will delete later
// View all users
router.get('/', (req, res) => {
  // render views/users.ejs
  res.render('users');
});

// /users/:id
// View user profile page (don't need to be signed in)
// Also view user's saved and liked pins
router.get('/:id', (req, res) => {
  // set userId to value from GET request
  const userId = req.params.id;

  // call getUserProfile with userId as argument
  userQueries.getUserProfile(userId)
    .then(result1 => {
      // call getUserProfile with userId as argument
      pinQueries.getUserPins(userId)
        .then(result2 => {
          // save results to template variables
          const templateVars = {
            user: result1.users,
            pins: result2.pins
          };
          // render pins_user with profile as template variable object
          res.render("pins_user", templateVars);
        });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

// /users/:id/edit
// View edit users page
router.get('/:id/edit', (req, res) => {
  // check for session cookie
  const userId = req.session.userId;
  if (!userId) {
    return res.send({ error: "not logged in" });
  }
  userQueries.getUserProfile(userId)
    .then((response) => {
      // render views/user_profile.ejs
      res.render('user_profile', response);
    });
});

module.exports = router;
