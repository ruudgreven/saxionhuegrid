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
  ip: "192.168.1.108",
  user: "1UmgNAICof88T2HqtgZf6YRzpr2Sk6hXMNihixI2"
}

//Initialize grid with light id's
var hue_ids = [
  [1,  -1,  -1],
  [3, 8, 2],
  [7, 14, 15],
  [4, 5, 13],
  [11, 12, 10],
  [16, 9, 6]
];

//Create grid
global.grid = new Grid(hue_ids);

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
app.listen(8080, function(){
  console.log("Start:\n" + "http://localhost/api/");
  setGrid();
  loopThunder();
  // loopGrid();
});
function loopThunder(){
  setTimeout(function(){
    thunder();
    loopThunder();
  }, Math.round(Math.random() * 4000 ) + 7000);
}
function loopGrid(){
  setTimeout(function () {
    setGrid();
    // console.log("Setting grid");
    // loopGrid();
    // randomColor(0,0);
    // loopGrid();
  }, 10);
}
function randomColor(x, y){
  global.grid.setState(x,y,true);
  // global.grid.setColorRGB(x,y,(Math.random() * 255),(Math.random() * 255), (Math.random() * 255));
  global.grid.setColorRGB(x,y, 32, 32, 32);
  global.grid.saveInstant(x,y,1);
}
function setGrid(){
  console.log("SetGrid");
  randomColor(2, 5);
  randomColor(1, 5);
  randomColor(0, 5);
  randomColor(1, 4);
  randomColor(0, 4);
  randomColor(2, 3);
  randomColor(1, 3);
  randomColor(0, 3);
  randomColor(2, 2);
  randomColor(1, 2);
  randomColor(0, 2);
  randomColor(2, 1);
  randomColor(1, 1);
  randomColor(2, 4);
  randomColor(0, 1);
  randomColor(0, 0);
  console.log("test");
}

function thunder(){
  var x = Math.round(Math.random() * 2);
  var y = Math.round(Math.random() * 4 ) +1;
  // global.grid.setColorRGB(x,y,(),(Math.random() * 255), (Math.random() * 255));
  //TODO: Get current state
  //TODO: Set current state to yellow, full brightness
  //TODO: Reset old state and reapply
  var times = Math.round(Math.random() * 6);
  for(var i = 0; i <= times; i++){
    global.grid.setColorRGB(x,y, 255, 255, 0);
    global.grid.setBrightness(x, y, 255);
    global.grid.saveInstant(x, y);
    setTimeout(function () {}, 300);
    global.grid.setColorRGB(x, y, 32, 32, 32);
    global.grid.setBrightness(x, y, 70);
    global.grid.saveInstant(x, y);
    setTimeout(function () {}, 400);
  }
}
module.exports = app;
