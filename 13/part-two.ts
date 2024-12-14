import { Arcade } from "./lib/clawContraption.ts";

const arcade = Arcade.fromString(await Deno.readTextFile("./input.txt"), true);

const sum = arcade.machines.map(machine => machine.solve()).reduce((a, c) => a + c, 0);

console.log(sum);