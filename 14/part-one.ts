import { Floor } from "./lib/restroomRedoubt.ts";

const floor = Floor.fromString(await Deno.readTextFile("./input.txt"), 101, 103);

for (let i = 0; i < 100; i++) floor.move();

const safetyFactor = floor.quadrants().map(arr => arr.length).reduce((a, c) => a * c, 1);

console.log(safetyFactor);