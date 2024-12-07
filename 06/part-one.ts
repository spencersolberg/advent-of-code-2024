import { PatrolMap } from "./lib/patrolMap.ts";

const patrolMap = new PatrolMap(await Deno.readTextFile("./input.txt"));

while (!patrolMap.isOutOfBounds(patrolMap.guard.position)) {
    patrolMap.patrol();
}

console.log(patrolMap.toString().replaceAll(/[^X]/gm, "").length);
