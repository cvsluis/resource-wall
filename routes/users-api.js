/*
 * All routes for User Data are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /api/users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();
const userQueries = require('../db/queries/users');

// example GET request to get all users
// will delete when finished with routes
router.get('/', (req, res) => {
  userQueries.getUsers()
    .then(users => {
      res.json({ users });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

// /api/users/:id/edit
// Edit user profile page (need to be signed in)
router.post("/:id/edit", (req, res) => {
  // check for session cookie
  const userId = req.session.userId;
  if (!userId) {
    return res.send({ error: "not logged in" });
  }

  // set variable to form body
  const userProfileChange = req.body;

  userQueries.editUserProfile(userId, userProfileChange)
    .then((response) => {
      res.redirect(`/users/${userId}`);  // Redirect user back to their profile page.
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

module.exports = router;
