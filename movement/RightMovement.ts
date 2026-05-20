import { MoveStrategy } from "./MoveStrategy.js";
export class RightMovement implements MoveStrategy {
    private x: number;
    private y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    update(deltaTime: number): void {
        this.x += 100 * deltaTime;  
    }

    getPosition(): { x: number, y: number } {
        return { x: this.x, y: this.y };
    }
}