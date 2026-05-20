import { Actor } from "./Actor.js";
export class Rectangle implements Actor {
  constructor(
    public x: number,
    public y: number,
    public width: number,
    public height: number,
  ) {}

  render(ctx: CanvasRenderingContext2D): void {
    ctx.fillStyle = "#66aaff";
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  move(delta: number): void {
    this.x += delta * 100; // Move 100 pixels per second
    this.y += delta * 100; // Move 100 pixels per second
  }

  sayHello(): void {
    console.log("Hello from Rectangle!");
  }
}
