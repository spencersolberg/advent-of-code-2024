import { Arcade, type PlayResult } from "./lib/clawContraption.ts";

const arcade = Arcade.fromString(await Deno.readTextFile("./input.txt"));

let sum = 0;

for (const machine of arcade.machines) {
    const wins: PlayResult[] = [];

    for (let a = 0; a <= 100; a++) {
        for (let b = 0; b <= 100; b++) {
            const result = machine.play(a, b);
            if (result.won) wins.push(result);
        }
    }

    if (!wins.length) continue;

    const cheapest = wins.reduce((p, c) => p.cost < c.cost ? p : c);
    sum += cheapest.cost;
}

console.log(sum);