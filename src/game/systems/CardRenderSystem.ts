import { System } from "../../ecs/System";
import { Card } from "../components/Card";
import { Entity } from "../../ecs/Entity";
import { DomElement } from "../components/DomElement";
import { Transform } from "../components/Transform";

export class CardRenderSystem extends System {
    public container: HTMLElement;
    private nextID: number;
    constructor(container: HTMLElement) {
        super([Card, Transform, DomElement]);
        this.container = container;
        this.nextID = 0;
    }

    onEntityAdded(entity: Entity, card: Card, transform: Transform, domElement: DomElement) {
        domElement.node = makeCard(`card-${this.nextID++}`, card.rank, card.suit);
        this.container.append(domElement.node);
    }

    onEntityRemoved(entity: Entity, card: Card, transform: Transform, domElement: DomElement) {}

    updateEntity(entity: Entity, card: Card, transform: Transform, domElement: DomElement) {
        domElement.node.style.transform = `translate(${transform.x}px,${transform.y}px)`;
    }
}

const makeCard = (id: string, rank: string, suit: string, faceup: boolean = false): HTMLElement => {
    const el = document.createElement("div");
    el.id = id;
    el.classList.add("card");
    const front = document.createElement("figure");
    front.classList.add("back");
    const back = document.createElement("figure");
    back.classList.add("front");
    el.append(front);
    el.append(back);
    el.classList.add(rankLookup[rank] || "X", suitLookup[suit] || "X", faceup ? "faceup" : "facedown");
    return el;
};

const suitLookup = {
    C: "clubs",
    S: "spades",
    D: "diamonds",
    H: "hearts",
};

const rankLookup = {
    "1": "one",
    "2": "two",
    "3": "three",
    "4": "four",
    "5": "five",
    "6": "six",
    "7": "seven",
    "8": "eight",
    "9": "nine",
    "10": "ten",
    J: "jack",
    Q: "queen",
    K: "king",
    A: "ace",
};
