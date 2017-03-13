var express = require('express');
var router = express.Router();

/* GET grid listing. */
router.get('/', function(req, res, next) {
    res.json(global.grid);
});

//TODO: Add post functions with whole grid of partial grid. What calls should be used for animation?

/**
 * Change the whole grid
 * Send a grid with lights
 *    {
        "x": 0,
        "y": 0,
        "on": true,
        "bri": 70,
        "color": {
          "r": 255,
          "g": 255,
          "b": 0
        }
      },
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
            console.log('Node ' + x + ', ' + y);
            var curLight = global.grid[y][x];
            console.log('Bla ' + x + ', ' + y);
            if (curlight == undefined) {
                throw 'Error light not found: ' + x + ', ' + y;
            }
            // Change color
            global.grid.setColorRGB(x, y, curLight.color.r, curLight.color.g, curLight.color.b);
            global.grid.setBrightness(x, y, bri);

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