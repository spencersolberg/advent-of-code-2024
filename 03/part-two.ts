import { Memory } from "./lib/memory.ts";

const memory = new Memory(await Deno.readTextFile("./input.txt"));

console.log(memory.sum());