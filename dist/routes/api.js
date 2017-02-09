var express = require('express');
var router = express.Router();
var fs = require('fs');
var database = require('../config/database.js');

router.put('/api/:id', function(req, res) {

  var id = req.params.id;
  var exists = false;
  var cookies = req.cookies;
  var config  = { maxAge: 900000, httpOnly: true };

  if(cookies.liked) {
    var cookie = JSON.parse(cookies.liked);
    if(cookie.liked.indexOf(id) == -1) {
      cookie.liked.push(id);
      res.cookie("liked",  JSON.stringify(cookie), config);
    } else {
      exists = true;
    }
  } else {
    res.cookie("liked", JSON.stringify({liked:[id]}), config);
  }

  if(!exists) {
    database.updateLikes(id, (cursor) => {
      res.json(cursor.likes);
    });
  } else {
    res.status(401).send({ error: 'Already voted' });
  }

});

module.exports = router;
