import { Observer } from './observer';

export class ForecastDisplay implements Observer {
  private lastPressure: number | null = null;
  private currentPressure: number | null = null;

  update(temp: number, humidity?: number, pressure?: number): void {
    if (typeof pressure === 'number') {
      this.lastPressure = this.currentPressure;
      this.currentPressure = pressure;
    }
    this.display();
  }

  display(): void {
    if (this.lastPressure === null || this.currentPressure === null) {
      console.log('Forecast: Not enough data yet');
      return;
    }

    if (this.currentPressure > this.lastPressure) {
      console.log('Forecast: Improving weather on the way!');
    } else if (this.currentPressure < this.lastPressure) {
      console.log('Forecast: Watch out for cooler, rainy weather.');
    } else {
      console.log('Forecast: More of the same.');
    }
  }
}
