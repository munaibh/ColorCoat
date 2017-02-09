// Require File.
var server;
var express = require('express');
var app = express();
var cookieParser = require('cookie-parser');
var database = require('./config/database.js');

// Configure ExpressJS
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'ejs');
app.set('views', 'app/views');
app.use(express.static('app/public'));
app.use(cookieParser());

// Setup Routes.
app.use(require('./routes/palletes'));
app.use(require('./routes/api'));
app.use(require('./routes/about'));

// Connect to Database and Server.
database.connect(function() {
  server = app.listen(app.get('port'), function() {
    console.log("listening");
  });
});
