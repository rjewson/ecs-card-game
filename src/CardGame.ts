import { GameEngine } from "./engine/GameEngine";
import { Phase } from "./ecs/Phase";
import { CardRenderSystem } from "./game/systems/CardRenderSystem";
import { Card } from "./game/components/Card";
import { DomElement } from "./game/components/DomElement";
import { Transform } from "./game/components/Transform";

export class CardGame extends GameEngine {
    public defaultPhase: Phase;
    protected frame: HTMLElement;

    constructor(frame: HTMLElement) {
        super();
        this.frame = frame;
        this.initalize();
    }

    initalize() {
        this.engine.addCapacityToEngine(1000);
        this.defaultPhase = new Phase();
        this.engine.addPhase(this.defaultPhase);

        this.defaultPhase.addSystem(new CardRenderSystem(this.frame));

        const firstCard = this.engine.createEntity();
        this.engine.addComponentsToEntity(firstCard, [new Card("A", "C"), new DomElement(), new Transform(200, 200)]);
    }

    public update(delta: number, now: number) {
        this.preUpdate();
        this.engine.update(delta, now);
        this.postUpdate();
    }

}
