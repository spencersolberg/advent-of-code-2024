import { Lists } from "./lib/lists.ts";

const lists = new Lists(await Deno.readTextFile("input.txt"));

console.log(lists.calculateSimilarity());