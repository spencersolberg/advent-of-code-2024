import { assertEquals } from "@std/assert";

import { Computer } from "./lib/chronospatialComputer.ts";

Deno.test("example 1", () => {
    const computer = new Computer(0, 0, 9, [2, 6]);
    computer.runProgram();

    assertEquals(computer.registerB, 1);
});

Deno.test("example 2", () => {
    const computer = new Computer(10, 0, 0, [5, 0, 5, 1, 5, 4]);
    computer.runProgram();
    
    assertEquals(computer.output, [0, 1, 2]);
});

Deno.test("example 3", () => {
    const computer = new Computer(2024, 0, 0, [0, 1, 5, 4, 3, 0]);
    computer.runProgram();
    
    assertEquals(computer.output, [4, 2, 5, 6, 7, 7, 7, 7, 3, 1, 0]);
    assertEquals(computer.registerA, 0);
});

Deno.test("example 4", () => {
    const computer = new Computer(0, 29, 0, [1, 7]);
    computer.runProgram();

    assertEquals(computer.registerB, 26);
});

Deno.test("example 5", () => {
    const computer = new Computer(0, 2024, 43690, [4, 0]);
    computer.runProgram();

    assertEquals(computer.registerB, 44354);
})