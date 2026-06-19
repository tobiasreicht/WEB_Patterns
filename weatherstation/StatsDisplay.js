"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatsDisplay = void 0;
var StatsDisplay = /** @class */ (function () {
    function StatsDisplay() {
        this.temps = [];
    }
    StatsDisplay.prototype.update = function (temp, humidity, pressure) {
        this.temps.push(temp);
        this.display();
    };
    StatsDisplay.prototype.display = function () {
        var count = this.temps.length;
        if (count === 0) {
            console.log('Statistics: no data');
            return;
        }
        var sum = this.temps.reduce(function (a, b) { return a + b; }, 0);
        var avg = sum / count;
        var min = Math.min.apply(Math, this.temps);
        var max = Math.max.apply(Math, this.temps);
        console.log("Statistics: avg=".concat(avg.toFixed(2), "\u00B0C, min=").concat(min, "\u00B0C, max=").concat(max, "\u00B0C"));
    };
    return StatsDisplay;
}());
exports.StatsDisplay = StatsDisplay;
