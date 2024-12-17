import { Computer } from "./lib/chronospatialComputer.ts";

const input = await Deno.readTextFile("./input.txt");

const original = Computer.fromString(input);

const programString = original.program.join(",");

for (let a = 0; a < Infinity; a++) {
    const computer = original.clone();
    computer.registerA = a;

    computer.runProgram();

    if (computer.output.join(",") === programString) {
        console.log(a);
        break;
    }
}
