export class PatrolMap {
    rows: Tile[][];
    guard: Guard;

    constructor(input: string) {
        const lines = input.split("\n");
        const rows: Tile[][] = [];
        let guard: Guard | undefined = undefined;

        for (const [rowNumber, line] of lines.entries()) {
            const row: Tile[] = [];

            for (const [columnNumber, char] of line.split("").entries()) {
                switch (char) {
                    case ".": {
                        row.push(Tile.Empty);
                        break;
                    }
                    case "#": {
                        row.push(Tile.Obstruction);
                        break;
                    }
                    case "^": {
                        guard = {
                            position: { row: rowNumber, column: columnNumber },
                            direction: Direction.North,
                            path: [],
                        };
                        row.push(Tile.Empty);
                        break;
                    }
                    case ">": {
                        guard = {
                            position: { row: rowNumber, column: columnNumber },
                            direction: Direction.East,
                            path: [],
                        };
                        row.push(Tile.Empty);
                        break;
                    }
                    case "V": {
                        guard = {
                            position: { row: rowNumber, column: columnNumber },
                            direction: Direction.South,
                            path: [],
                        };
                        row.push(Tile.Empty);
                        break;
                    }
                    case "<": {
                        guard = {
                            position: { row: rowNumber, column: columnNumber },
                            direction: Direction.West,
                            path: [],
                        };
                        row.push(Tile.Empty);
                        break;
                    }
                }
            }
            rows.push(row);
        }

        if (!guard) throw new Error("No guard found in input!");

        this.rows = rows;
        this.guard = guard;
    }

    get height() {
        return this.rows.length;
    }

    get width() {
        return this.rows[0].length;
    }

    public getTile(point: Point): Tile | null {
        if (this.isOutOfBounds(point)) return null;

        return this.rows[point.row][point.column];
    }

    public isOutOfBounds(point: Point): boolean {
        return (point.row < 0 || point.row >= this.height || point.column < 0 ||
            point.column >= this.width);
    }

    public patrol(): boolean {
        const cycle = this.guard.path.some((pp) =>
            pp.point.row === this.guard.position.row &&
            pp.point.column === this.guard.position.column &&
            pp.direction === this.guard.direction
        ); // if we've been at this same point facing the same direction before, it is going to cycle.
        const nextPoint = PatrolMap.translatePoint(
            this.guard.position,
            this.guard.direction,
        );
        const nextTile = this.getTile(nextPoint);

        switch (nextTile) {
            case null: { // out of bounds aka the guard has finished patrolling
                this.guard = {
                    ...this.guard,
                    position: nextPoint,
                    path: [...this.guard.path, {
                        point: this.guard.position,
                        direction: this.guard.direction,
                    }],
                };
                break;
            }
            case Tile.Empty: { // empty tile, move forward in same direction
                this.guard = {
                    ...this.guard,
                    position: nextPoint,
                    path: [...this.guard.path, {
                        point: this.guard.position,
                        direction: this.guard.direction,
                    }],
                };

                break;
            }
            case Tile.Obstruction: { // obstruction is blocking current direction, rotate 90° clockwise
                const newDirection = (this.guard.direction + 1) % 4;
                this.guard = {
                    ...this.guard,
                    direction: newDirection,
                };
            }
        }

        return cycle;
    }

    static translatePoint(point: Point, direction: Direction) {
        const translations = [
            [-1, 0],
            [0, 1],
            [1, 0],
            [0, -1],
        ];

        const [dy, dx] = translations[direction];

        return { row: point.row + dy, column: point.column + dx };
    }

    public toString(): string {
        let rows: string[][] = [];
        for (let r = 0; r < this.rows.length; r++) {
            let row: string[] = [];
            for (let c = 0; c < this.rows[0].length; c++) {
                const tile = this.getTile({ row: r, column: c })!;
                switch (tile) {
                    case Tile.Empty: {
                        // const isInGuardPath = this.guard.path.some(
                        //     (pathPoint) =>
                        //         pathPoint.point.row === r &&
                        //         pathPoint.point.column === c
                        // );
                        const inGuardPath = this.guard.path.filter((pp) =>
                            pp.point.row === r && pp.point.column == c
                        );
                        if (inGuardPath.length) {
                            const isVerticalAndHorizontal =
                                inGuardPath.some((pp) =>
                                    [0, 2].includes(pp.direction)
                                ) && inGuardPath.some((pp) =>
                                    [1, 3].includes(pp.direction)
                                );
                            const isVertical = inGuardPath.some((pp) =>
                                [0, 2].includes(pp.direction)
                            );

                            if (isVerticalAndHorizontal) {
                                row.push("+");
                            } else if (isVertical) {
                                row.push("|");
                            } else {
                                row.push("-");
                            }
                        } else {
                            row.push(".");
                        }
                        break;
                    }
                    case Tile.Obstruction: {
                        row.push("#");
                    }
                }
            }

            rows.push(row);
        }

        if (!this.isOutOfBounds(this.guard.position)) {
            rows[this.guard.position.row][this.guard.position.column] =
                ["^", ">", "V", "<"][this.guard.direction];
        }
        return rows.map((row) => row.join("")).join("\n");
    }

    public async cycles(debug = false) {
        let cycles = false;
        while (!this.isOutOfBounds(this.guard.position)) {
            if (debug) await sleep(300);
            const cycle = this.patrol();
            if (debug) console.log(this.toString());
            if (cycle) {
                cycles = true;
                break;
            }
        }

        return cycles;
    }

    static obstructString(input: string, point: Point): string {
        const lines = input.split("\n");
        const rows = lines.map(line => line.split(""));
        if (rows[point.row][point.column] === ".") {
            rows[point.row][point.column] = "#";
        }

        return rows.map(row => row.join("")).join("\n");
    }
}

enum Tile {
    Empty = ".",
    Obstruction = "#",
}

type Guard = {
    position: Point;
    direction: Direction;
    path: PathPoint[];
};

type Point = {
    row: number;
    column: number;
};

type PathPoint = {
    point: Point;
    direction: Direction;
};

enum Direction {
    North,
    East,
    South,
    West,
}

const sleep = (ms: number) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}