var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

/**
 * Change a single light
 */
// TODO: error handling
router.post('/', function(req, res) {
    // if (!req.body.grid) {
    //     res.status(400).json({error: 'No grid provided as parameters in body.'});
    // }

    var param = req.body;

    // Get duration from body
    var duration = 0;
    if (req.body.duration) {
        duration = Number(req.body.duration);
    }

    if (param.x == undefined) {
        res.status(400).json({error: 'No X coordinate supplied.'});
    }
    if (param.y == undefined) {
        res.status(400).json({error: 'No Y coordinate supplied.'});
    }

    // Change color
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
    if (duration > 0) {
        global.grid.getLight(param.x, param.y).saveWithTransitionTime(duration);
    } else {
        global.grid.getLight(param.x, param.y).saveInstant();
    }

    res.status(200).json({succes: true});
});

module.exports = router;