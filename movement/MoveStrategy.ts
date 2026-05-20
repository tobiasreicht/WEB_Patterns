export interface MoveStrategy {
    update(deltaTime: number): void;
    getPosition(): { x: number, y: number };
}