import { Update } from "./lib/manual.ts";
import { assertEquals } from "jsr:@std/assert/equals";

Deno.test("move element test", () => {
    const original = [0, 4, 2, 3];
    const moved = Update.moveElement(original, 1, 3);

    assertEquals(moved, [0, 2, 3, 4]);
})