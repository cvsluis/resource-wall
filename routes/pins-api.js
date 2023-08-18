/*
 * All routes for Pins Data are defined here
 * Since this file is loaded in server.js into api/pins,
 *   these routes are mounted onto /api/pins
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();
const pinQueries = require('../db/queries/pins');
const pinQueries = require('../db/queries/interactions');

//View all pins
router.get('/', (req, res) => {
  // call getAllPins with req.query as argument for search functionality
  // do we want a limit?
  pinQueries.getAllPins(req.query)
    .then(pins => {
      // render index with profile as template variable object
      res.render("home", pins);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

// View one pin
router.get('/:id', (req, res) => {
  // set pinId to url parameter
  const pinId = req.params.id;
  if (!pinId) {
    return res.send({ error: "error" });
  }

  // call getOnePin with pinId as argument
  pinQueries.getOnePin(pinId)
    .then(pin => {
      // render pins_user with profile as template variable object
      res.render("pins_show", pin);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

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

// Add comment
router.post('/comment', (req, res) => {
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
module.exports = router;
