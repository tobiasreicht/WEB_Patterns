export class Circle {
    constructor(radius, movement) {
        this.radius = radius;
        this.movement = movement;
    }
    setRadius(radius) {
        // if radius is valid
        this.radius = radius;
    }
    update(deltaTime) {
        this.movement.update(deltaTime);
    }
    render(ctx) {
        const position = this.movement.getPosition();
        ctx.beginPath();
        ctx.arc(position.x, position.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = "#ff6666";
        ctx.fill();
    }
}
