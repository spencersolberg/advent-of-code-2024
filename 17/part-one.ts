import { Computer } from "./lib/chronospatialComputer.ts";

const computer = Computer.fromString(await Deno.readTextFile("./input.txt"));

computer.runProgram();

console.log(computer.output.join(","));