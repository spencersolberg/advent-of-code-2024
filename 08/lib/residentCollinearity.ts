// export class City {
//     rows: Tile[][];

//     constructor(rows: Tile[][]) {
//         this.rows = rows;
//     }

//     static fromString(input: string): City {
//         const rows: Tile[][] = [];

//         for (const line of input.split("\n")) {
//             const row: Tile[] = [];
//             for (const char of line.split("")) {
//                 if (char === ".") {
//                     row.push(new Empty())
//                 } else {
//                     row.push(new Antenna(char));
//                 }
//             }

//             rows.push(row);
//         }

//         return new City(rows);
//     }
// }


// class Antenna {
//     frequency: string;

//     constructor(frequency: string) {
//         this.frequency = frequency;
//     }
// }

// class Empty {
//     constructor() {}
// };

// type Tile = Antenna | Empty;

export class City {
    tiles: Tile[];
    width: number;
    height: number;

    constructor(tiles: Tile[], width: number, height: number) {
        this.tiles = tiles;
        this.width = width;
        this.height = height;
    }

    static fromString(input: string): City {
        const tiles: Tile[] = [];

        let lastRow = 0;
        let lastColumn = 0;

        for (const [r, line] of input.split("\n").entries()) {
            lastRow = r;
            for (const [c, char] of line.split("").entries()) {
                lastColumn = c;
                if (char === ".") {
                    tiles.push(new Tile({ row: r, column: c}));
                } else {
                    tiles.push(new Tile({ row: r, column: c}, char));
                }
            }
        }

        return new City(tiles, lastRow + 1, lastColumn + 1);
    }

    public getPairings(tile: Tile): Tile[][] {
        const pairings: Tile[][] = [];

        const filtered = this.tiles.filter(other => other.frequency === tile.frequency && City.arePositionsDifferent(other.position, tile.position));

        for (const pairing of filtered) {
            pairings.push([tile, pairing]);
        }

        return pairings;
    }

    static arePositionsDifferent(position1: Point, position2: Point): boolean {
        if (position1.row === position2.row && position1.column === position2.column) return false;
        return true;
    }

    static getAntinodes(first: Tile, second: Tile): Point[] {
        // first: r3, c4
        // second: r5, c5
        // delta: r2, c1
        // a1: r1, c3
        // a2: r7, c6

        const delta = { row: second.position.row - first.position.row, column: second.position.column - first.position.column };

        const a1 = { row: first.position.row - delta.row, column: first.position.column - delta.column };
        const a2 = { row: second.position.row + delta.row, column: second.position.column + delta.column };

        return [a1, a2];
    }

    public isOutOfBounds(point: Point): boolean {
        if (
            point.column < 0 ||
            point.row < 0 ||
            point.column >= this.width ||
            point.row >= this.height
        ) return true;

        return false;
    }
}

class Tile {
    position: Point;
    frequency?: string;

    constructor(position: Point, frequency?: string) {
        this.position = position;
        this.frequency = frequency;
    }

}

export type Point = {
    row: number;
    column: number;
}