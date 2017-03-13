var express = require('express');
var path = require('path');
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
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Routes
app.use('/users', users);
app.use('/light', lights);
app.use('/grid', grid);

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

    res.send(res.locals.message);
});

app.listen(3000, function () {
    console.log('Saxion hue grid listening on port 3000');
});

module.exports = app;
