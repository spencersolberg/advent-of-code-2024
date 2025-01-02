import { City } from "./lib/residentCollinearity.ts";

const city = City.fromString(await Deno.readTextFile("./input.txt"));

const antinodeSet = new Set<string>();

for (const antenna of city.tiles.filter(tile => tile.frequency)) {
    for (const pairing of city.getPairings(antenna)) {
        const antinodes = City.getAntinodes(pairing[0], pairing[1]).filter(antinode => !city.isOutOfBounds(antinode));

        for (const antinode of antinodes) {
            antinodeSet.add(`${antinode.row},${antinode.column}`);
        }
    }
}

console.log(antinodeSet.size);