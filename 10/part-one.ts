import { TopographicMap } from "./lib/hoofIt.ts";

const map = TopographicMap.fromString(await Deno.readTextFile("./input.txt"));

// console.log(map.getTrailheads());


let sum = 0;

for (const trailhead of map.getTrailheads()) {
    const ends = new Set<string>;

    for (const end of map.getEnds(trailhead)) {
        ends.add(`${end.column},${end.row}`);
    }

    sum += ends.size;
}

console.log(sum);