import { Memory } from "./lib/memory.ts";

const memory = new Memory(await Deno.readTextFile("./input.txt"));

let sum = 0;

for (const instruction of memory.multiplyInstructions) {
    sum += instruction.product;
}

console.log(sum);