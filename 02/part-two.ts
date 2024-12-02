import { Data } from "./lib/data.ts";

const data = new Data(await Deno.readTextFile("./input.txt"));

let sum = 0;

for (const report of data.reports) {
    if (report.isSafe(true)) sum++;
}

console.log(sum);