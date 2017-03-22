var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

/**
 * Change a single light
 */
router.post('/', function(req, res) {
    var param = req.body;

    // Validate parameters
    if (param.x == undefined) {
        res.status(400).json({error: 'No X coordinate supplied.'});
    }
    if (param.y == undefined) {
        res.status(400).json({error: 'No Y coordinate supplied.'});
    }
    if (!global.grid.lightExists(param.x, param.y)) {
        res.status(400).json({error: 'Position (x: ' + x + ", y: " + y + ") is an invalid grid position (or does not contain a light)."});
    }

    // Get duration from body (without duration, use 0 -> instant)
    var duration = 0;
    if (req.body.duration) {
        duration = Number(req.body.duration);
    }

    // Change color
    // TODO: error handling
    if (param.color != undefined) {
        global.grid.setColorRGB(param.x, param.y, param.color.r, param.color.g, param.color.b);
    }
    if (param.bri != undefined) {
        global.grid.setBrightness(param.x, param.y, param.bri);
    }
    if (param.on != undefined) {
        global.grid.setState(param.x, param.y, param.on);
    }

    // Apply fade or change instant
    if (param.duration > 0) {
        global.grid.getLight(param.x, param.y).saveWithTransitionTime(duration);
    } else {
        global.grid.getLight(param.x, param.y).saveInstant();
    }

    res.status(200).json({succes: true});
});

/**
 * Change all lights in a certain row
 */
router.post('/row', function(req, res) {
    res.status(400).json({error: 'Not implemented yet...'});
});

/**
 * Change all lights in a certain column
 */
router.post('/column', function(req, res) {
    res.status(400).json({error: 'Not implemented yet...'});
});

module.exports = router;