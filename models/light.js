var request = require('request');

function Light(posx, posy, hue_id) {
    this.x = posx;
    this.y = posy;

    this.hue_id = hue_id;
    this.on = false;
    this.bri = 70;
    this.color = {
        r: 255,
        g: 255,
        b: 255
    };

    this.colorToXY = function toXY(red,green,blue){
        //Gamma correctie
        red = (red > 0.04045) ? Math.pow((red + 0.055) / (1.0 + 0.055), 2.4) : (red / 12.92);
        green = (green > 0.04045) ? Math.pow((green + 0.055) / (1.0 + 0.055), 2.4) : (green / 12.92);
        blue = (blue > 0.04045) ? Math.pow((blue + 0.055) / (1.0 + 0.055), 2.4) : (blue / 12.92);

        //Apply wide gamut conversion D65
        var X = red * 0.664511 + green * 0.154324 + blue * 0.162028;
        var Y = red * 0.283881 + green * 0.668433 + blue * 0.047685;
        var Z = red * 0.000088 + green * 0.072310 + blue * 0.986039;

        var fx = X / (X + Y + Z);
        var fy = Y / (X + Y + Z);
        if (isNaN(fx)) {
            fx = 0.0;
        }
        if (isNaN(fy)) {
            fy = 0.0;
        }

        return [fx.toPrecision(4),fy.toPrecision(4)];
    };
}

Light.prototype.turnOn = function(state) {
    this.on = true;
};

Light.prototype.turnOff = function(state) {
    this.on = false;
};

Light.prototype.setColorRGB = function(r, g, b) {
    this.color.r = r;
    this.color.g = g;
    this.color.b = b;
};

Light.prototype.setBrightness = function(bri){
    this.bri = bri;
};



Light.prototype.saveInstant = function() {
    var xy = this.colorToXY(this.color.r, this.color.g, this.color.b);
    var state = "{\"xy\":[" + xy[0] + ", " + xy[1] + "], \"transitiontime\":1, \"bri\":"+this.bri+", \"on\":"+this.on+"}";
    console.log("API", "Submitting state to HUE api: " + state);
    request({
        method: 'PUT',
        uri: 'http://' + global.hue.ip + '/api/' + global.hue.user + '/lights/' + this.hue_id + '/state',
        body: state
    }, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(body)
        } else {
            throw error;
        }
    });
};

Light.prototype.saveWithTransitionTime = function(time) {
    var xy = this.colorToXY(this.color.r, this.color.g, this.color.b);
    var state = "{\"xy\":[" + xy[0] + ", " + xy[1] + "], \"transitiontime\": " + time * 10 + "}";
    console.log("API", "Submitting state to HUE api: " + state);
    request({
        method: 'PUT',
        uri: 'http://' + global.hue.ip + '/api/' + global.hue.user + '/lights/' + this.hue_id + '/state',
        body: state
    }, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(body)
        } else {
            throw error;
        }
    });
};

module.exports = Light;