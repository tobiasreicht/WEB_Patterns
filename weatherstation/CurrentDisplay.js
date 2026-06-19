"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CurrentDisplay = void 0;
var CurrentDisplay = /** @class */ (function () {
    function CurrentDisplay() {
        this.temperature = 0;
        this.humidity = 0;
    }
    CurrentDisplay.prototype.update = function (temp, humidity, pressure) {
        this.temperature = temp;
        if (typeof humidity === 'number')
            this.humidity = humidity;
        this.display();
    };
    CurrentDisplay.prototype.display = function () {
        console.log("Current conditions: ".concat(this.temperature, "\u00B0C and ").concat(this.humidity, "% humidity"));
    };
    return CurrentDisplay;
}());
exports.CurrentDisplay = CurrentDisplay;
