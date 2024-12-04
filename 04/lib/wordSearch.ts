export class WordSearch {
    rows: Letter[][];

    constructor(input: string) {
        const lines = input.split("\n");

        const rows: Letter[][] = [];

        for (const line of lines) {
            rows.push(line.split("") as Letter[])
        }

        this.rows = rows;
    }

    // public getLetter(row: number, column: number): Letter | null {
    //     return (this.rows.at(row) ?? []).at(column) ?? null;
    // }
    
    public getLetter(point: Point): Letter | null {
        // return (this.rows.at(point.row) ?? []).at(point.column) ?? null;
        return (this.rows[point.row] ?? [])[point.column] ?? null;
    }

    get rowLength(): number {
        return this.rows.length;
    }

    get columnLength(): number {
        return this.rows[0].length;
    }

    static translatePoint(point: Point, direction: Direction): Point {
        const translations = [
            [-1, 0],
            [-1, 1],
            [0, 1],
            [1, 1],
            [1, 0],
            [1, -1],
            [0, -1],
            [-1, -1]
        ];
    
        const translation = translations[direction];
    
        return { row: point.row + translation[0], column: point.column + translation[1] };
    }
}

export enum Letter {
    X = "X",
    M = "M",
    A = "A",
    S = "S"
}

type Point = {
    row: number;
    column: number;
}

export enum Direction {
    North,
    Northeast,
    East,
    Southeast,
    South,
    Southwest,
    West,
    Northwest
}

export type Journey = {
    progress: 1 | 2 | 3,
    startingPoint: Point,
    currentPoint: Point,
    direction: Direction
}