var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

// Load routes
var index = require('./routes/index');
var users = require('./routes/users');
var lights = require('./routes/lights');
var grid = require('./routes/grid');
var hueapi = require('./routes/hueapi');

// Load models
var Grid = require('./models/grid');
var Light = require('./models/light');

/**
 * HUE settings
 * @type {{ip: string, user: string}}
 */
global.hue = {
  ip: "192.168.1.108",
  user: "1UmgNAICof88T2HqtgZf6YRzpr2Sk6hXMNihixI2"
}

//Initialize grid with light id's
var hue_ids = [
  [16,  9,  6],
  [11, 12, 10],
  [4,   5, 13],
  [7,  14, 15],
  [3,   8,  2],
  [1,  -1, -1]
];

//Create grid
global.grid = new Grid(hue_ids);

var app = express();

// Uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Make REST service accessible from other domains
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

// Define routes
app.use('/users', users);
app.use('/light', lights);
app.use('/grid', grid);

// Default route for overview page
app.use('/', express.static(path.join(__dirname, 'public')));

// Error handling (404)
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// Error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    res.send(res.locals.message);
});

// Start app on port 3000
app.listen(3000, function () {
    console.log('Saxion hue grid listening on port 3000');
});

module.exports = app;