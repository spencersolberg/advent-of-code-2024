import { PatrolMap } from "./lib/patrolMap.ts";

const patrolMap = new PatrolMap(await Deno.readTextFile("./input.txt"));

let sum = 0;

const originalString = patrolMap.toString();

for (let r = 0; r < patrolMap.height; r++) {
    for (let c = 0; c < patrolMap.width; c++) {
        const percentage = ((r * patrolMap.height) + (c + 1)) / (patrolMap.height * patrolMap.width);
        console.log(`Progress: ${(percentage * 100).toFixed(2)}%`) // took like ten minutes on my macbook
        const obstructedString = PatrolMap.obstructString(originalString, { row: r, column: c });
        const obstructedMap = new PatrolMap(obstructedString);
        if (await obstructedMap.cycles()) sum++;
    }
}

console.log(sum);