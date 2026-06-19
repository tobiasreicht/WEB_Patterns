import { Game, GameFramework } from "./GameFramework.js";
import { Circle } from "./actors/Circle.js";
import { Rectangle } from "./actors/Rectangle.js";
import { LeftMovement } from "./movement/LeftMovement.js";
import { RightMovement } from "./movement/RightMovement.js";
class MyGame extends Game {
    constructor() {
        super(...arguments);
        this.actors = [];
    }
    init() {
        console.log("Game started!");
        this.actors.push(new Circle(50, new LeftMovement(400, 300)));
        this.actors.push(new Rectangle(100, 50, new RightMovement(400, 300)));
        this.actors.push(new Rectangle(50, 50, new LeftMovement(200, 200)));
    }
    update(deltaTime) {
        this.actors.forEach(actor => actor.update(deltaTime));
    }
    render(ctx) {
        // Draw rectangle
        this.actors.forEach(actor => actor.render(ctx));
    }
}
const game = new MyGame();
const framework = new GameFramework(game, 800, 600);
framework.start();
console.log("test");
