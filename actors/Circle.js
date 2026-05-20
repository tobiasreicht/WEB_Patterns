export class Circle {
    constructor(x, y, radius) {
        this.x = x;
        this.y = y;
        this.radius = radius;
    }
    render(ctx) {
        ctx.fillStyle = "#ff6666";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
    }
    move(delta) {
        this.x += delta * 100; // Move 100 pixels per second
    }
}
