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
const interactionQueries = require('../db/queries/interactions');

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
  // logged in user
  const userId = req.session.userId;
  // user profile that will be rendered
  const paramsUserId = req.params.id;

  // call getUserProfile with paramsUserId as argument
  userQueries.getUserProfile(paramsUserId)
    .then(profile => {
      // call getUserPins with paramsUserId as argument
      pinQueries.getUserPins(paramsUserId)
        .then(pins => {
          interactionQueries.getAllCategories()
            .then(categories => {
              // render pins_user with profile for user information,
              // pins for users saved and liked pins, and userId to show/hide edit profile button
              res.render("pins_user", { profile, pins, userId, categories });
            });
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
  // logged in user
  const userId = req.session.userId;
  // profile that will be rendered
  const paramsUserId = req.params.id;
  // if they don't match: incorrect login credentials
  if (userId !== paramsUserId) {
    return res.send({ error: "not logged in to the correct account" });
  }
  // getUserProfile with cookie variable as userId
  userQueries.getUserProfile(userId)
    .then(profile => {
      interactionQueries.getAllCategories()
        .then(categories => {
          // render user_profile with profile for form values, and userId for nav
          res.render('user_profile', { profile, userId, categories });
        });
    });
});

module.exports = router;
