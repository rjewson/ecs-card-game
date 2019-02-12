import { CardGame } from "./CardGame";

const engine = new CardGame(document.getElementById("container"));
engine.loop.start();