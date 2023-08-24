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
    .then(() => {
      res.redirect("/pins/");
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

// /api/pins/:id/comments (id refers to pin id)
// Add comment
router.post('/:id/comments', (req, res) => {
  const pinId = req.params.id;
  // check for session cookie
  const userId = req.session.userId;
  if (!userId) {
    return res.send({ error: "not logged in" });
  }

  const comment = req.body;
  comment.description = req.body.description;
  comment.pin_id = pinId;
  comment.owner_id = userId;

  interactionQueries.addComment(comment)
    .then((comment) => {;
      res.redirect(`/pins/${pinId}`);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

// /api/pins/:id/ratings (id refers to pin id)
// Add rating
router.post('/:id/ratings', (req, res) => {
  const pinId = req.params.id;
  // check for session cookie
  // change this to a hard-coded value (like 1 for user 1) for testing endpoint with curl command:
  const userId = req.session.userId;
  if (!userId) {
    return res.send({ error: "not logged in" });
  }

  const rating = {
    'pin_id': pinId,
    'owner_id': userId,
    'value': req.body.rating
  };

  interactionQueries.addRating(rating)
    .then((rating) => {
      res.redirect(`/pins/${pinId}`);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

// /api/pins/:id/likes (id refers to pin id)
// Add like
router.post('/:id/likes', (req, res) => {
  const pinId = req.params.id;
  // check for session cookie
  // change this to a hard-coded value (like 1 for user 1) for testing endpoint with curl command:
  const userId = req.session.userId;
  if (!userId) {
    return res.send({ error: "not logged in" });
  }

  const like = {
    'pin_id': pinId,
    'owner_id': userId
  };

  interactionQueries.addLike(like)
    .then((like) => {
      res.redirect(`/pins/${pinId}`);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

// /api/pins/:id/likes/delete (id refers to pin id)
// Remove like
router.delete('/:id/likes/delete', (req, res) => {
  const pinId = req.params.id;
  // check for session cookie
  // change this to a hard-coded value (like 1 for user 1) for testing endpoint with curl command:
  const userId = req.session.userId;
  if (!userId) {
    return res.send({ error: "not logged in" });
  }

  const unlike = {
    'pin_id': pinId,
    'owner_id': userId
  };

  interactionQueries.removeLike(unlike)
    .then((unlike) => {
      // Replaced redirect with JSON response
      res.json({ success: true, message: "Like removed successfully!" });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

module.exports = router;
