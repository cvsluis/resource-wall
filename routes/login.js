const express = require('express');
const router = express.Router();

// Login user
router.get('/:id', (req, res) => {
  // using encrypted cookies
  req.session.userId = req.params.id;

  // send the user to home page
  res.redirect('../');
});

module.exports = router;
