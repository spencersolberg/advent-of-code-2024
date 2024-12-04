// M S
//  A 
// M S
//
// M M
//  A 
// S S
//
// S M
//  A
// S M
//
// S S
//  A
// M M
//

import { WordSearch, Letter, Direction } from "./lib/wordSearch.ts";

const wordSearch = new WordSearch(await Deno.readTextFile("./input.txt"));

const instances = [];

// loop through rows
// loop through letters
// if it's an A, grab four corners and join them to a string
// check if it matches "MSMS", "MMSS", "SMSM", or "SSMM"

for (const [rowNumber, row] of wordSearch.rows.entries()) {
    for (const [columnNumber, letter] of row.entries()) {
        if (letter !== Letter.A) continue;
        
        const point = { row: rowNumber, column: columnNumber };
        const corners: Array<Letter | null> = [];
        for (const direction of [Direction.Northwest, Direction.Northeast, Direction.Southwest, Direction.Southeast]) {
            const newPoint = WordSearch.translatePoint(point, direction);
            corners.push(wordSearch.getLetter(newPoint));
        }

        if (corners.some(corner => corner === null)) continue;

        if (["MSMS", "MMSS", "SMSM", "SSMM"].includes(corners.join(""))) instances.push({ startingPoint: point });
    }
}

console.log(instances.length);