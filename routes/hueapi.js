var express = require('express');
var router = express.Router();
var request = require('request');

//Map the HUE API
router.get('*', function (req, res, next) {
    var path = req.path.replace('hueapi/', 'api/')
    console.log("HUE", "Request submitted to HUE Bridge: " + 'http://' + global.hue.ip + path);
    request({ url: 'http://' + 'http://' + global.hue.ip + path, headers: req.headers }, function(err, remoteResponse, remoteBody) {
        if (err) {
            return res.status(500).end('Error');
        }
        res.end(remoteBody);
    });
})

router.put('/hueapi', function(req, res) {
    request({ url: 'http://remoteserver.com' + req.path, headers: req.headers, body: req.body }, function(err, remoteResponse, remoteBody) {
        if (err) {
            return res.status(500).end('Error');
        }
        res.end(remoteBody);
    });
});

module.exports = router;