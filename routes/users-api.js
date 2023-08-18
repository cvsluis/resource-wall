/*
 * All routes for User Data are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /api/users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();
const userQueries = require('../db/queries/users');
const pinQueries = require('../db/queries/pins');

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

// View user profile page
router.get('/:id', (req, res) => {
  // check for session cookie
  const userId = req.session.userId;
  if (!userId) {
    return res.send({ error: "error" });
  }

  // call getUserProfile with userId as argument
  userQueries.getUserProfile(userId)
    .then(result1 => {
      // call getUserProfile with userId as argument
      pinQueries.getUsersPins(userId)
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

// Edit user profile page
router.post("/:id", (req, res) => {
  // check for session cookie
  const userId = req.session.userId;
  if (!userId) {
    return res.send({ error: "not logged in" });
  }

  const userProfileChange = req.body;

  userQueries.editUserProfile(userId, userProfileChange)
  // use response to let user know if changes were saved or not
    .then((response) => {
      res.send(response);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

module.exports = router;
