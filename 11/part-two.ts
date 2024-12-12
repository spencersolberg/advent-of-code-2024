import { StoneFormation } from "./lib/stones.ts";

const formation = StoneFormation.fromString(await Deno.readTextFile("./input.txt"));
const blinks = 75;
for (let i = 0; i < blinks; i++) {
    formation.blink();
}

console.log(formation.length);
