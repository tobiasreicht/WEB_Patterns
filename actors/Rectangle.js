export class Rectangle {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
    render(ctx) {
        ctx.fillStyle = "#66aaff";
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    move(delta) {
        this.x += delta * 100; // Move 100 pixels per second
        this.y += delta * 100; // Move 100 pixels per second
    }
    sayHello() {
        console.log("Hello from Rectangle!");
    }
}
