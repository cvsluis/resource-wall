/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();

// View all users
router.get('/', (req, res) => {
  // render views/users.ejs
  res.render('users');
});

module.exports = router;
