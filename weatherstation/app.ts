const station = new WeatherStation();

const current = new CurrentDisplay();
const forecast = new ForecastDisplay();
const stats = new StatsDisplay();

station.register(current);
station.register(forecast);
station.register(stats);

station.setMeasurements(22, 55, 1012);
