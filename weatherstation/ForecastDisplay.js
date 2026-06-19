"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForecastDisplay = void 0;
var ForecastDisplay = /** @class */ (function () {
    function ForecastDisplay() {
        this.lastPressure = null;
        this.currentPressure = null;
    }
    ForecastDisplay.prototype.update = function (temp, humidity, pressure) {
        if (typeof pressure === 'number') {
            this.lastPressure = this.currentPressure;
            this.currentPressure = pressure;
        }
        this.display();
    };
    ForecastDisplay.prototype.display = function () {
        if (this.lastPressure === null || this.currentPressure === null) {
            console.log('Forecast: Not enough data yet');
            return;
        }
        if (this.currentPressure > this.lastPressure) {
            console.log('Forecast: Improving weather on the way!');
        }
        else if (this.currentPressure < this.lastPressure) {
            console.log('Forecast: Watch out for cooler, rainy weather.');
        }
        else {
            console.log('Forecast: More of the same.');
        }
    };
    return ForecastDisplay;
}());
exports.ForecastDisplay = ForecastDisplay;
