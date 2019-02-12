import { Engine } from "../ecs/Engine";
import { GameLoop } from "./GameLoop";
import { Entity } from "../ecs/Entity";

export class GameEngine {
    public loop: GameLoop;
    public engine: Engine;

    constructor() {
        this.loop = new GameLoop();
        this.loop.updateFunc = this.update.bind(this);

        this.engine = new Engine();
    }

    public initalize() {}

    public update(delta: number, now: number) {
        this.preUpdate();
        this.engine.update(delta, now);
        this.postUpdate();
    }

    public preUpdate() {}

    public postUpdate() {}
}

export type EntityCb = (engine: Engine, entity: Entity) => void;
