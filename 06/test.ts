import { PatrolMap } from "./lib/patrolMap.ts";
const input = await Deno.readTextFile("./testInput.txt");
Deno.test("with obstacle test", () => {
    const original = new PatrolMap(input);
    // console.log(original);
    const obstructed = PatrolMap.obstructString(original.toString(), { row: 1, column: 1});
    console.log(obstructed.toString());
});