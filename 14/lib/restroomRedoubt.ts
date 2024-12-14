export class Floor {
    robots: Robot[];
    width: number;
    height: number;

    constructor(robots: Robot[], width: number, height: number) {
        this.robots = robots;
        this.width = width;
        this.height = height;
    }

    static fromString(input: string, width: number, height: number) {
        const robots: Robot[] = [];

        for (const line of input.split("\n")) {
            robots.push(Robot.fromString(line));
        }

        return new Floor(robots, width, height);
    }

    public move() {
        const rows = Array.from({ length: this.height }, (_, i) => i)
        const cols = Array.from({ length: this.width }, (_, i) => i);
        for (const robot of this.robots) {
            const newPosition: Point = {
                row: rows.at((robot.position.row + robot.velocity.row) % this.height)!,
                column: cols.at((robot.position.column + robot.velocity.column) % this.width)!
            }

            robot.position = newPosition;
        }
    }

    public toString(): string {
        const rows: Array<string | number>[] = [];
        for (let r = 0; r < this.height; r++) {
            const row = Array(this.width).fill(".");
            rows.push(row);
        }

        for (const robot of this.robots) {
            const current = rows[robot.position.row][robot.position.column];
            let newValue: number;

            if (typeof current === "number") {
                newValue = current + 1;
            } else newValue = 1;
            rows[robot.position.row][robot.position.column] = newValue;
        }

        return rows.map(row => row.join("")).join("\n");
    }

    public quadrants(): RobotQuadrants {
        const quadrants: RobotQuadrants = [[], [], [], []];

        const middleRows = Floor.middles(this.height);
        const middleCols = Floor.middles(this.width);

        for (const robot of this.robots) {
            switch (true) {
                case robot.position.row < middleRows[0] && robot.position.column < middleCols[0]: {
                    quadrants[0].push(robot);
                    break;
                }
                case robot.position.row < middleRows[0] && robot.position.column > middleCols[1]: {
                    quadrants[1].push(robot);
                    break;
                }
                case robot.position.row > middleRows[1] && robot.position.column > middleCols[1]: {
                    quadrants[2].push(robot);
                    break;
                }
                case robot.position.row > middleRows[1] && robot.position.column < middleCols[0]: {
                    quadrants[3].push(robot);
                }
            }
        }

        return quadrants;
    }

    static middles(number: number): [number, number] {
        if (number % 2 === 0) {
            return [(number / 2) - 1, number / 2];
        } else {
            return [Math.ceil(number / 2) - 1, Math.ceil(number / 2) - 1];
        }
    }
}

type Point = {
    row: number;
    column: number;
}

type RobotQuadrants = [Robot[], Robot[], Robot[], Robot[]];

class Robot {
    position: Point;
    velocity: Point;

    constructor(position: Point, velocity: Point) {
        this.position = position;
        this.velocity = velocity;
    }

    static fromString(input: string): Robot {
        const [_, colPos, rowPos, colVel, rowVel] = [...input.matchAll(/p=([0-9]+),([0-9]+) v=([-0-9]+),([-0-9]+)/gm)][0];

        return new Robot({
            row: parseInt(rowPos),
            column: parseInt(colPos)
        }, {
            row: parseInt(rowVel),
            column: parseInt(colVel)
        });
    }
}