import { Manual } from "./lib/manual.ts";

const manual = new Manual(await Deno.readTextFile("input.txt"));

const correctUpdates = manual.updates.filter(update => update.checkOrder(manual.orderingRules));

let sum = 0;

for (const update of correctUpdates) {
    sum += update.middle;
}

console.log(sum);