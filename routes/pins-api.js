/*
 * All routes for Pins Data are defined here
 * Since this file is loaded in server.js into api/pins,
 *   these routes are mounted onto /api/pins
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();
const pinQueries = require('../db/queries/pins');
const interactionQueries = require('../db/queries/interactions');

// /api/pins/
// model this function after Lightbnb addProperty
// Add one pin (need to be logged in, check for cookie)
router.post('/', (req, res) => {
  // check for session cookie
  const userId = req.session.userId;
  if (!userId) {
    return res.send({ error: "not logged in" });
  }

  const newPin = req.body;
  newPin.owner_id = userId;

  // call getOnePin with pinId as argument
  pinQueries.addOnePin(newPin)
    .then(pin => {
      // send data in json format
      res.json({ pin });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

// /api/pins/comments
// Add comment
router.post('/comments', (req, res) => {
  // check for session cookie
  const userId = req.session.userId;
  if (!userId) {
    return res.send({ error: "not logged in" });
  }

  const comment = req.body;
  interactionQueries.addComment(userId, comment)
    .then(comment => {
      res.json({ comment });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

// /api/pins/ratings
// Add rating
router.post('/ratings', (req, res) => {
  // check for session cookie
  const userId = req.session.userId;
  if (!userId) {
    return res.send({ error: "not logged in" });
  }

  const rating = req.body;
  interactionQueries.addRating(userId, rating)
    .then(rating => {
      res.json({ rating });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

// /api/pins/likes
// Add like
router.post('/likes', (req, res) => {
  // check for session cookie
  const userId = req.session.userId;
  if (!userId) {
    return res.send({ error: "not logged in" });
  }

  const like = req.body;
  interactionQueries.addLike(userId, like)
    .then(like => {
      res.json({ like });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

// /api/pins/likes/:id/delete
// Remove like
router.post('/likes/:id/delete', (req, res) => {
  // check for session cookie
  const userId = req.session.userId;
  if (!userId) {
    return res.send({ error: "not logged in" });
  }

  const like = req.body;
  interactionQueries.removeLike(userId, like)
    .then(like => {
      res.json({ like });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

module.exports = router;
