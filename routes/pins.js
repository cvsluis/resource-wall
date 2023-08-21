const express = require('express');
const router = express.Router();
const pinQueries = require('../db/queries/pins');
const interactionQueries = require('../db/queries/interactions');

// /pins/ - this is what the actual route would be
//View all pins
router.get('/', (req, res) => {
  console.log("we are here")
  // call getAllPins with req.query as argument for search functionality
  // do we want a limit?
  pinQueries.getAllPins(req.query)
    .then(pins => {
      // render index with profile as template variable object
      res.render("index", { pins });
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
    res.render("pins_new", { categories });
  })
});

// /pins/:id
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
      res.render("pins_show", { pin });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

module.exports = router;
