import { ClawMachine } from "./lib/clawContraption.ts";
import { assert } from "jsr:@std/assert/";

Deno.test("wins prize", () => {
    const machine = new ClawMachine(
        { x: 94, y: 34 },
        { x: 22, y: 67 },
        { x: 8400, y: 5400 }
    );

    assert(machine.play(80, 40));
});