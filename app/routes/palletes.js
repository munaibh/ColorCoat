var express = require('express');
var router = express.Router();
var database = require('../config/database.js');

router.get('/', (req, res) => {

  var arr = [];
  if(req.cookies.liked) {
    arr = JSON.parse(req.cookies.liked).liked;
  }

  var results = new Array();
  database.latestPalletes((cursor) => {
    cursor.forEach((doc, err) => {
       results.push(doc)
     }, () => {
       res.render('index', {
         pageID: 'latest',
         palletes: results,
         voted: arr
       });
     });
  });
});

router.get('/popular', function(req, res) {

  var arr = [];
  if(req.cookies.liked) {
    arr = JSON.parse(req.cookies.liked).liked;
  }

  var results = new Array();
  database.popularPalletes((cursor) => {
    cursor.forEach((doc, err) => {
       results.push(doc)
     }, () => {
       res.render('index', {
         pageID: 'popular',
         palletes: results,
         voted: arr
       });
     });
  });

});

router.get('/pallete/:id', function(req, res) {

  var id = req.params.id;
  var results = new Array();
  database.selectedPallete(id, (cursor) => {
    cursor.forEach((doc, err) => {
       results.push(doc)
     }, () => {
       res.render('index', {
         pageID: 'popular',
         palletes: results
       });
     });
  });

});

module.exports = router;
