var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');
var lights = require('./routes/lights');
var grid = require('./routes/grid');
var hueapi = require('./routes/hueapi');

var Grid = require('./models/grid');
var Light = require('./models/light');

global.hue = {
  ip: "192.168.1.30",
  user: "UUqwtAOyBrtQj2WmfG9tCn-6Nx2JCF24qke6q5Hp"
}

//Initialize grid with light id's
var hue_ids = [
  [12, 12, 12],
  [12, 12, 12],
  [12, 12, 12],
  [12, 12, 12],
  [12, 12, 12],
  [12, -1, -1]
];

//Create grid
global.grid = new Grid(hue_ids);
global.grid.setState(0,5,true);
global.grid.setColorRGB(2,2,0,0,255);
global.grid.saveInstant(2,2,10);

var app = express();

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Routes
app.use('/users', users);
app.use('/lights', lights);
app.use('/grid', grid);
// app.use('/hueapi', hueapi); //NOT YET WORKING

//Default route
app.use('/', express.static(path.join(__dirname, 'public')));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.end(res.locals.message);
});

module.exports = app;
