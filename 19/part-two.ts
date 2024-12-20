import { Layout } from "./lib/linenLayout.ts";

const layout = Layout.fromString(await Deno.readTextFile("./input.txt"));

let sum = 0;

for (const [i, design] of layout.designs.entries()) {
    sum += design.getPossibilities(layout.patterns);
    const percent = ((i + 1) / layout.designs.length) * 100;
    console.log(`${percent}%`);
}

console.log(sum);