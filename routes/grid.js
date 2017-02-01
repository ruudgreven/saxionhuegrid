var express = require('express');
var router = express.Router();

/* GET grid listing. */
router.get('/', function(req, res, next) {
    res.json(global.grid);
});

//TODO: Add post functions with whole grid of partial grid. What calls should be used for animation?

module.exports = router;