export interface Actor {
  render(ctx: CanvasRenderingContext2D): void;
  move(delta: number): void;
}
