"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var weatherstation_1 = require("./weatherstation");
var display_1 = require("./display");
var station = new weatherstation_1.default();
var current = new display_1.CurrentDisplay();
var forecast = new display_1.ForecastDisplay();
var stats = new display_1.StatsDisplay();
// Register displays
station.register(current);
station.register(forecast);
station.register(stats);
// Initial readings
station.setMeasurements(22, 55, 1012);
station.setMeasurements(23, 54, 1013);
// Unregister the forecast display at runtime
station.remove(forecast);
// Another reading after unregistering forecast
station.setMeasurements(21, 60, 1009);
