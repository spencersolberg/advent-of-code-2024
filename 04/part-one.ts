import { WordSearch, Letter, Direction, Journey } from "./lib/wordSearch.ts";

const wordSearch = new WordSearch(await Deno.readTextFile("./input.txt"));

const instances = [];

for (const [rowNumber, row] of wordSearch.rows.entries()) {
    for (const [columnNumber, letter] of row.entries()) {
        if (letter !== Letter.X) continue;

        for (let d = Direction.North; d <= Direction.Northwest; d++) {
            let journey: Journey = {
                progress: 1,
                startingPoint: { row: rowNumber, column: columnNumber },
                currentPoint: { row: rowNumber, column: columnNumber },
                direction: d
            };

            for(let p = 2; p <= 4; p++) {
                const nextPoint = WordSearch.translatePoint(journey.currentPoint, journey.direction)
                const nextLetter = wordSearch.getLetter(nextPoint)

                if ((p === 2 && nextLetter === Letter.M) || (p === 3 && nextLetter === Letter.A)) {
                    journey = {
                        ...journey,
                        progress: p,
                        currentPoint: nextPoint,
                    }
                } else if (p === 4 && nextLetter === Letter.S) {
                    instances.push({
                        startingPoint: journey.startingPoint,
                        direction: journey.direction
                    })
                    break;
                } else break;
            }
        }
    }
}

console.log(instances.length);