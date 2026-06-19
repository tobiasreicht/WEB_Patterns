export class LeftMovement {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    update(deltaTime) {
        this.x -= 100 * deltaTime;
    }
    getPosition() {
        return { x: this.x, y: this.y };
    }
}
