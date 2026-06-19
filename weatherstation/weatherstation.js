"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WeatherStation = void 0;
var WeatherStation = /** @class */ (function () {
    function WeatherStation() {
        this.observers = [];
        this.temp = 0;
        this.humidity = 0;
        this.pressure = 0;
    }
    WeatherStation.prototype.register = function (o) {
        this.observers.push(o);
    };
    WeatherStation.prototype.remove = function (o) {
        this.observers = this.observers.filter(function (obs) { return obs !== o; });
    };
    WeatherStation.prototype.notify = function () {
        for (var _i = 0, _a = this.observers; _i < _a.length; _i++) {
            var o = _a[_i];
            o.update(this.temp, this.humidity, this.pressure);
        }
    };
    WeatherStation.prototype.setMeasurements = function (t, h, p) {
        this.temp = t;
        this.humidity = h;
        this.pressure = p;
        this.notify();
    };
    return WeatherStation;
}());
exports.WeatherStation = WeatherStation;
exports.default = WeatherStation;
