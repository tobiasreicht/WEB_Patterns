export class Rectangle {
    constructor(width, height, movement) {
        this.width = width;
        this.height = height;
        this.movement = movement;
    }
    update(deltaTime) {
        this.movement.update(deltaTime);
    }
    render(ctx) {
        const position = this.movement.getPosition();
        ctx.fillStyle = "#66aaff";
        ctx.fillRect(position.x, position.y, this.width, this.height);
    }
}
