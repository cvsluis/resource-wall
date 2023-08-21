const express = require('express');
const router = express.Router();
const pinQueries = require('../db/queries/pins');
const interactionQueries = require('../db/queries/interactions');

// /pins/ - this is what the actual route would be
//View all pins
router.get('/', (req, res) => {
  // logged in user
  const userId = req.session.userId;
  // call getAllPins with req.query as argument for search functionality
  // do we want a limit?
  pinQueries.getAllPins(req.query.q)
    .then(pins => {
      // render index with pins and userId
      res.render("index", { pins, userId });
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
  pinQueries.getOnePin(pinId)
    .then(pin => {
      interactionQueries.getComments(pinId)
        .then(comments => {
          // const timeAgo = timeago.format(comments.created_at);
          // render pins_show with profile as template variable object
          res.render("pins_show", { pin, comments, userId });
        });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

module.exports = router;
