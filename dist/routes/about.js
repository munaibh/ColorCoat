var express = require('express');
var router = express.Router();

router.get('/about', (req, res) => {
  res.render('about', {
    pageID: 'about'
  });
});

module.exports = router;
