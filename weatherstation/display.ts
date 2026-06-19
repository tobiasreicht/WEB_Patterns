class CurrentDisplay implements Observer {
  update(temp: number, humidity: number): void {
    console.log(`Current: ${temp}°C, ${humidity}%`);
  }
}

class ForecastDisplay implements Observer {
  update(temp: number, humidity: number, pressure: number): void {
    console.log(`Forecast based on pressure: ${pressure}`);
  }
}

class StatsDisplay implements Observer {
  private temps: number[] = [];

  update(temp: number): void {
    this.temps.push(temp);

    const avg = this.temps.reduce((a, b) => a + b) / this.temps.length;

    console.log(`Avg temp: ${avg}`);
  }
}