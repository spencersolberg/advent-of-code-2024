import { Computer } from "./lib/chronospatialComputer.ts"

Deno.bench({
    name: "test quine",
    fn() {
        const input = `Register A: 2024
Register B: 0
Register C: 0

Program: 0,3,5,4,3,0`
        const original = Computer.fromString(input);
        
        const programString = original.program.join(",");
        
        for (let a = 0; a < Infinity; a++) {
            const computer = original.clone();
            // const computer = Computer.
            computer.registerA = a;
        
            computer.runProgram();
        
            if (computer.output.join(",") === programString) {
                console.log(a);
                break;
            };
        }
    }
})