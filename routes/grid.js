var express = require('express');
var router = express.Router();

/* GET grid listing. */
router.get('/', function(req, res, next) {
    res.json(global.grid);
});

//TODO: Add post functions with whole grid of partial grid. What calls should be used for animation?

/**
 * Change the whole grid
 */
// TODO: error handling for wrong parameters
router.post('/', function(req, res) {
    if (!req.body.grid) {
        res.status(400).json({error: 'No grid provided as parameters in body.'});
    }
    var paramGrid = req.body.grid;

    // Get duration from body
    var duration = 0;
    if (req.body.duration) {
        duration = Number(req.body.duration);
    }

    // Change light in the grid and apply changes
    for (var y=0; y < global.grid.getHeight(); y++) {
        for (var x=0; x < global.grid.getWidth(); x++) {
            var curLight = grid[y][x];
            // Change color
            global.grid.setColorRGB(x, y, curLight.r, curLight.g, curLight.b);

            // Apply fade or change instant
            if (duration > 0) {
                global.grid.saveWithTransitionTime(x, y);
            } else {
                global.grid.saveInstant(x, y);
            }
        }
    }

    res.status(200).json({succes: true});
});

module.exports = router;