import { Observer } from './observer';

export class CurrentDisplay implements Observer {
  private temperature: number = 0;
  private humidity: number = 0;

  update(temp: number, humidity?: number, pressure?: number): void {
    this.temperature = temp;
    if (typeof humidity === 'number') this.humidity = humidity;
    this.display();
  }

  display(): void {
    console.log(`Current conditions: ${this.temperature}°C and ${this.humidity}% humidity`);
  }
}
