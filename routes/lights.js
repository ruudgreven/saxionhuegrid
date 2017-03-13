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

    // Change color
    global.grid.setColorRGB(param.x, param.y, param.r, param.g, param.b);

    // Apply fade or change instant
    if (duration > 0) {
        global.grid.saveWithTransitionTime(param.x, param.y);
    } else {
        global.grid.saveInstant(param.x, param.y);
    }

    res.status(200).json({succes: true});
});

module.exports = router;