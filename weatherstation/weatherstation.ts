import { Observer, Subject } from './observer';

export class WeatherStation implements Subject {
  private observers: Observer[] = [];

  private temp = 0;
  private humidity = 0;
  private pressure = 0;

  register(o: Observer): void {
    this.observers.push(o);
  }

  remove(o: Observer): void {
    this.observers = this.observers.filter(obs => obs !== o);
  }

  notify(): void {
    for (const o of this.observers) {
      o.update(this.temp, this.humidity, this.pressure);
    }
  }

  setMeasurements(t: number, h: number, p: number): void {
    this.temp = t;
    this.humidity = h;
    this.pressure = p;

    this.notify();
  }
}

export default WeatherStation;