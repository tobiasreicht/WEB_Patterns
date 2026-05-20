import { Actor } from "./Actor";
import { LeftMovement } from "../movement/LeftMovement.js";
import { MoveStrategy } from "../movement/MoveStrategy";
export class Rectangle implements Actor {
    constructor(private width: number, private height: number, private movement: MoveStrategy) { }

    update(deltaTime: number): void {
        this.movement.update(deltaTime);
    }

    render(ctx: CanvasRenderingContext2D): void {
        const position = this.movement.getPosition();
        ctx.fillStyle = "#66aaff";
        ctx.fillRect(position.x, position.y, this.width, this.height);
    }
}