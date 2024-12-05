import { Manual } from "./lib/manual.ts";

const manual = new Manual(await Deno.readTextFile("input.txt"));

const incorrectUpdates = manual.updates.filter(update => update.checkOrder(manual.orderingRules) === false);

let sum = 0;
let failed = 0;

for (const update of incorrectUpdates) {
    const corrected = update.repairUpdate(manual.orderingRules);
    if (!corrected.checkOrder(manual.orderingRules)) {
        console.error(`${update.pageNumbers} => ${corrected.pageNumbers} is still incorrect`)
        failed++;
    }
    sum += corrected.middle;
}

console.log(sum);
