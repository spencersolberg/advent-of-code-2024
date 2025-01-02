import TinyQueue from "npm:tinyqueue";

export class TopographicMap {
    rows: number[][]

    constructor(rows: number[][]) {
        this.rows = rows;
    }

    static fromString(input: string) {
        const rows: number[][] = [];
        for (const line of input.split('\n')) {
            const row: number[] = [];
            for (const char of line.split("")) {
                row.push(parseInt(char));
            }
            rows.push(row);
        }

        return new TopographicMap(rows);
    }

    public getTrailheads(): Point[] {
        const trailheads: Point[] = [];

        for (const [r, row] of this.rows.entries()) {
            for (const [c, height] of row.entries() ) {
                if (height === 0) trailheads.push({ row: r, column: c });
            }
        }

        return trailheads;
    }

    public getEnds(trailhead: Point): Point[] {
        const journeys = new TinyQueue<Journey>([{
            currentPosition: trailhead,
            movements: 0
        }], (a, b) => b.movements - a.movements);

        const ends: Point[] = [];

        while(journeys.length > 0) { 
            const journey = journeys.pop()!;
            const currentHeight = this.getHeight(journey.currentPosition);

            if (currentHeight === 9) {
                ends.push(journey.currentPosition);
                continue;
            }

            for (const dir of [0, 1, 2, 3]) {
                // if we aren't at the trailhead and we're trying to travel back to where we just were, skip
                if (journey.lastMovement !== undefined && dir === modulo(journey.lastMovement - 2, 4)) continue;

                const nextPosition = TopographicMap.translatePoint(journey.currentPosition, dir);

                if (this.isOutOfBounds(nextPosition)) continue;

                const nextHeight = this.getHeight(nextPosition);

                if (nextHeight !== currentHeight + 1) continue;

                journeys.push({
                    currentPosition: nextPosition,
                    lastMovement: dir,
                    movements: journey.movements + 1
                });
            }
        }

        return ends;
    }

    public getHeight(position: Point) {
        return this.rows[position.row][position.column];
    }

    static translatePoint(point: Point, direction: Direction): Point {
        const translations = [
            [-1, 0],
            [0, 1],
            [1, 0],
            [0, -1]
        ];

        return { row: point.row + translations[direction][0], column: point.column + translations[direction][1] };
    }

    public isOutOfBounds(point: Point): boolean {
        if (
            point.row < 0 ||
            point.column < 0 ||
            point.row >= this.rows.length ||
            point.column >= this.rows[0].length
        ) return true;
        return false;
    }
}

type Point = {
    row: number;
    column: number;
}

type Journey = {
    currentPosition: Point;
    lastMovement?: Direction;
    movements: number;
}

enum Direction {
    North,
    East,
    South,
    West
}

const modulo = (a: number, b: number): number => { return ((a % b) + b) % b; }