var Light = require('./light');

/**
 * The constructor of a Grid.
 * Give an array with Philips HUE id's of the light, -1 means that there is no light at that place
 * Example (OTSWO G4)
 * var hue_ids = [
 * [1,  2,  3],
 * [4,  5,  6],
 * [7,  8,  9],
 * [10, 11, 12],
 * [13, 14, 15],
 * [16, -1, -1]
 * ];
 */
function Grid(hue_ids) {
    this.lights = new Array();

    for (var y=0; y<hue_ids.length; y++) {
        this.lights[y] = new Array();
        for (var x=0; x<hue_ids[y].length; x++) {
            if (hue_ids[y][x] != -1) {
                this.lights[y][x] = new Light(x, y, hue_ids[y][x]);
            } else {
                this.lights[y][x] = undefined;
            }
        }
    }
    console.log("Grid", "initialized with size " + hue_ids[0].length + ", " + hue_ids.length);
}

/**
 * Specify the state (boolean, true for on, false for off) for the light at position x, y.
 */
Grid.prototype.setState = function(x, y, state) {
    if (this.lights[y][x] === undefined) {
        throw new Error("The light at position " + x + ", " + y + " does not exists");
    }
    if (typeof(state) !== "boolean") {
        throw new Error("Please give a boolean state");
    }

    if (state == true) {
        this.lights[y][x].turnOn();
    } else {
        this.lights[y][x].turnOff();
    }
};

/**
 * Specify the color (r,g,b from 0 to 255) for the light at position x, y.
 */
Grid.prototype.setColorRGB = function(x, y, r, g, b) {
    if (this.lights[y][x] === undefined) {
        throw new Error("The light at position " + x + ", " + y + " does not exists");
    }
    if (typeof(r) !== "number" || typeof(g) !== "number" || typeof(b) !== "number") {
        throw new Error("Please give an integer value for r, g and b");
    }
    if (r < 0 || r > 255 || g < 0 || g > 255 || b < 0 || b > 255) {
        throw new Error("Please supply a number between 0 and 255 for r, g and b");
    }

    this.lights[y][x].setColorRGB(r,g,b);
};

/**
 * Save the state of one light to the philips api
 */
Grid.prototype.saveInstant = function(x, y) {
    if (this.lights[y][x] === undefined) {
        throw new Error("The light at position " + x + ", " + y + " does not exists");
    }
    this.lights[y][x].saveInstant();
};

/**
 * Save the state of one light to the philips api with a transition time in seconds (minimum steps 0.1)
 */
Grid.prototype.saveWithTransitionTime = function(x, y, time) {
    if (this.lights[y][x] === undefined) {
        throw new Error("The light at position " + x + ", " + y + " does not exists");
    }
    this.lights[y][x].saveWithTransitionTime(time);
};

module.exports = Grid;