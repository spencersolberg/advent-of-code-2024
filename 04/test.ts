import { assertEquals } from "jsr:@std/assert";

import { WordSearch, Direction } from "./lib/wordSearch.ts";

Deno.test({
    name: "translate point test",
    fn() {
        const point = { row: 2, column: 4 };
        const translated = WordSearch.translatePoint(point, Direction.North);

        assertEquals(translated, { row: 1, column: 4 });
    }
})