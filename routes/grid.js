var express = require('express');
var router = express.Router();

/* GET grid listing. */
router.get('/', function(req, res, next) {
    res.json(global.grid);
});

//TODO: Add post functions with whole grid of partial grid. What calls should be used for animation?

/**
 * Set the
 */
router.post('/', function(req, res) {
    if (!req.body.grid) {
        res.status(400).json({error: 'No grid provided as parameters in body.'});
    }

    global.grid.getHeight()


});

module.exports = router;