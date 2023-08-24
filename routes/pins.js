const express = require('express');
const router = express.Router();
const pinQueries = require('../db/queries/pins');
const interactionQueries = require('../db/queries/interactions');
const timeago = require('timeago.js');

// /pins/ - this is what the actual route would be
//View all pins
router.get('/', (req, res) => {
  // logged in user
  const userId = req.session.userId;
  // call getAllPins with req.query as argument for search functionality
  // do we want a limit?
  pinQueries.getAllPins(req.query.q)
    .then(pins => {
      interactionQueries.getAllCategories()
        .then(categories => {
          // render index with pins and userId
          res.render("index", { pins, userId, categories });
        });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

// /pins/new
// View add one pin page
router.get('/new', (req, res) => {
  const userId = req.session.userId;
  if (!userId) {
    // update this to error page with link to login?
    res.redirect("/");
  }

  interactionQueries.getAllCategories()
    .then(categories => {
      res.render("pins_new", { categories, userId });
    });
});

// /pins/:id
// View one pin
router.get('/:id', (req, res) => {
  const userId = req.session.userId;
  // set pinId to url parameter
  const pinId = req.params.id;
  if (!pinId) {
    return res.send({ error: "error" });
  }

  // call getOnePin with pinId as argument
  pinQueries.getOnePin(pinId, userId)
    .then(pin => {
      interactionQueries.getComments(pinId)
        .then(comments => {
          interactionQueries.getAllCategories()
            .then(categories => {
              // update created_at time to timeago format
              for (const comment of comments) {
                comment.created_at = timeago.format(comment.created_at);
              }
              // render pins_show with profile as template variable object
              res.render("pins_show", { pin, comments, userId, pinId, categories });
            });
        });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

module.exports = router;
