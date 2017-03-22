var request = require('request');

/**
 * Represents a single light entity
 * @param posX X-position in the grid
 * @param posY Y-position in the grid
 * @param hueId Id of the light (configured by bridge)
 * @constructor Initializes the light with default settings (these settings are not updated directly!)
 */
function Light(posX, posY, hueId) {
    this.hue_id = hueId;
    this.x = posX;
    this.y = posY;
    this.on = false;
    this.bri = 100;
    this.color = {
        r: 255,
        g: 255,
        b: 255
    };

    // Variables for keeping track if there are changes (only if there are changes, these values are sent to the light: this speeds up the process)
    this.stateChanged = false;
    this.briChanged = false;
    this.colorChanged = false;


    /**
     * Converts RGB color to XY spectrum
     * @param red byte representing amount of red (0..255)
     * @param green byte representing amount of green (0..255)
     * @param blue byte representing amount of blue (0..255)
     * @returns Array with x and y values (as floats)
     */
    this.colorToXY = function toXY(red, green, blue){
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

/**
 * Switch on/off state of the light
 * @param state boolean, true indicates light on, false indicates light off
 */
Light.prototype.setState = function(state) {
    if (typeof(state) !== "boolean") {
        throw new Error("Please give a boolean state");
    }

    // Only send new state to bridge when state changes
    if (this.on != state) {
        this.stateChanged = true;
        this.on = state;
    }
};

/**
 * Set the RGB color of the light
 * @param r Amount of red (byte)
 * @param g Amount of green (byte)
 * @param b Amount of blue (byte)
 */
Light.prototype.setColorRGB = function(r, g, b) {
    if (r != this.color.r || g != this.color.g || b != this.color.b) {
        this.colorChanged = true;
        this.color.r = r;
        this.color.g = g;
        this.color.b = b;
    }
};

/**
 * Set brightness of the light
 * @param bri Brightness (value between 0 and 255)
 */
Light.prototype.setBrightness = function(bri){
    if (this.bri != bri) {
        this.briChanged = true;
        this.bri = bri;
    }
};

/**
 * Save instant directly updates the light (without fade)
 */
Light.prototype.saveInstant = function() {
    // Save without transition time
    this.saveWithTransitionTime(0);

};

/**
 * Save light state and fade to this state over a specific period of time (in seconds)
 * @param time amount of seconds for the fade
 */
Light.prototype.saveWithTransitionTime = function(time) {
    // If there are no changes, do not update the light
    if (!this.colorChanged && !this.briChanged && !this.stateChanged) {
        return;
    }

    // Build new state
    var state = "{\"transitiontime\": " + time * 10;

    if (this.colorChanged) {
        var xy = this.colorToXY(this.color.r, this.color.g, this.color.b);
        state += ", \"xy\":[" + xy[0] + ", " + xy[1] + "]";
    }
    if (this.briChanged) {
        state += ", \"bri\":" + this.bri;
    }
    if (this.stateChanged) {
        state += ", \"on\":" + this.on;
    }
    state += "}";

    console.log("API", "Submitting state to HUE api: " + state);
    request({
        method: 'PUT',
        uri: 'http://' + global.hue.ip + '/api/' + global.hue.user + '/lights/' + this.hue_id + '/state',
        body: state
    }, function (error, response, body) {
        // Reset changed variables
        this.briChanged = false;
        this.stateChanged = false;
        this.colorChanged = false;

        if (!error && response.statusCode == 200) {
            console.log(body)
        } else {
            //throw error;
        }
    });
};

module.exports = Light;