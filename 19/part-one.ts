import { Layout } from "./lib/linenLayout.ts";

const layout = Layout.fromString(await Deno.readTextFile("./input.txt"));

const sum = layout.designs.filter(design => design.isPossible(layout.patterns)).length;

console.log(sum);