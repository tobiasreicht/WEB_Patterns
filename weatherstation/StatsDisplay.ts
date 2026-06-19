import { Observer } from './observer';

export class StatsDisplay implements Observer {
  private temps: number[] = [];

  update(temp: number, humidity?: number, pressure?: number): void {
    this.temps.push(temp);
    this.display();
  }

  display(): void {
    const count = this.temps.length;
    if (count === 0) {
      console.log('Statistics: no data');
      return;
    }

    const sum = this.temps.reduce((a, b) => a + b, 0);
    const avg = sum / count;
    const min = Math.min(...this.temps);
    const max = Math.max(...this.temps);

    console.log(`Statistics: avg=${avg.toFixed(2)}°C, min=${min}°C, max=${max}°C`);
  }
}
