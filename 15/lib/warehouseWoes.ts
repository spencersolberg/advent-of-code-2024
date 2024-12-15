export class Warehouse {
    rows: Tile[][];
    robot: Point;
    moves: Direction[];

    constructor(rows: Tile[][], robot: Point, moves: Direction[]) {
        this.rows = rows;
        this.robot = robot;
        this.moves = moves;
    }

    static fromString(input: string) {
        const [wareHouseString, moveString] = input.split("\n\n");

        const moves = moveString.replaceAll("\n", "").split("") as Direction[];

        const rows: Tile[][] = [];
        let robot: Point | undefined;

        for (const [r, line] of wareHouseString.split("\n").entries()) {
            const row: Tile[] = [];
            for (const [c, char] of line.split("").entries()) {
                switch (char) {
                    case "@": {
                        robot = { row: r, column: c };
                        row.push(Tile.Empty);
                        break;
                    }
                    default: {
                        row.push(char as Tile);
                        break;
                    }
                }
            }
            rows.push(row);
        }

        if (!robot) throw new Error("No @ symbol found");

        return new Warehouse(rows, robot, moves);
    }

    static translatePoint(point: Point, direction: Direction): Point {
        // const translation = [[-1, 0], [0, 1], [1, 0], [0, -1]][direction]
        const translations = {
            "^": [-1, 0],
            ">": [0, 1],
            "v": [1, 0],
            "<": [0, -1]
        }
        return {
            row: point.row + translations[direction][0],
            column: point.column + translations[direction][1]
        }
    }

    public toString(): string {
        const rows = this.rows as string[][];

        rows[this.robot.row][this.robot.column] = "@";

        return rows.map(row => row.join("")).join("\n");
    }

    public processMove() {
        const direction = this.moves.shift()!;
        const path: Point[] = [this.robot];

        let hitWall = false;

        pathLoop: while (true) {
            const nextPoint = Warehouse.translatePoint(path.at(-1)!, direction);
            const nextTile = this.getTile(nextPoint);

            switch (nextTile) {
                case Tile.Wall: {
                    hitWall = true;
                    break pathLoop;
                }
                case Tile.Empty: {
                    break pathLoop;
                }
                case Tile.Box: {
                    path.push(nextPoint);
                    continue pathLoop;
                }
            }
        }

        if (hitWall) return;

        path.shift();

        this.rows[this.robot.row][this.robot.column] = Tile.Empty;
        this.robot = Warehouse.translatePoint(this.robot, direction);

        for (const point of path.reverse()) {
            const newPoint = Warehouse.translatePoint(point, direction);
            this.rows[newPoint.row][newPoint.column] = Tile.Box;
            this.rows[point.row][point.column] = Tile.Empty;
        }
    }

    public getTile(point: Point): Tile {
        if ((point.row >= this.rows.length) || (point.column >= this.rows[0].length)) throw new Error(`${point} is out of bounds`);

        return this.rows[point.row][point.column];
    }

    static getGpsCoordinate(point: Point) {
        return (100 * point.row) + point.column;
    }
}

export enum Tile {
    Empty = ".",
    Wall = "#",
    Box = "O"
}

type Point = {
    row: number;
    column: number;
}

enum Direction {
    North = "^",
    East = ">",
    South = "v",
    West = "<"
}