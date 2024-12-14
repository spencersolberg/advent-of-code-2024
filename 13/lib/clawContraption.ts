export class Arcade {
    machines: ClawMachine[];

    constructor(machines: ClawMachine[]) {
        this.machines = machines;
    }

    static fromString(input: string, partTwo = false): Arcade {
        const machines: ClawMachine[] = [];

        for (const machineString of input.split("\n\n")) {
            machines.push(ClawMachine.fromString(machineString, partTwo));
        }

        return new Arcade(machines);
    }
}

export class ClawMachine {
    buttonA: Pair;
    buttonB: Pair;
    prize: Pair;

    constructor(buttonA: Pair, buttonB: Pair, prize: Pair) {
        this.buttonA = buttonA;
        this.buttonB = buttonB;
        this.prize = prize;
    }

    static fromString(input: string, partTwo = false): ClawMachine {
        const [_, aX, aY, bX, bY, pX, pY] = [...input.matchAll(/Button A: X\+([\d]+), Y\+([\d]+)\nButton B: X\+([\d]+), Y\+([\d]+)\nPrize: X=([\d]+), Y=([\d]+)/gm)][0];

        return new ClawMachine(
            {
                x: parseInt(aX),
                y: parseInt(aY)
            },
            {
                x: parseInt(bX),
                y: parseInt(bY)
            },
            {
                x: parseInt(pX) + (partTwo ? 10_000_000_000_000 : 0),
                y: parseInt(pY) + (partTwo ? 10_000_000_000_000 : 0)
            }
        );
    }

    public play(aPresses: number, bPresses: number): PlayResult {
        const totalX = (aPresses * this.buttonA.x) + (bPresses * this.buttonB.x);
        const totalY = (aPresses * this.buttonA.y) + (bPresses * this.buttonB.y);

        return {
            won: (totalX === this.prize.x) && (totalY === this.prize.y),
            cost: (aPresses * 3) + (bPresses)
        };
    }

    public solve(): number {
        // buttonA.x buttonB.x
        // buttonA.y buttonB.y
        const d = (this.buttonA.x * this.buttonB.y) - (this.buttonB.x * this.buttonA.y);
        // prize.x buttonB.x
        // prize.y buttonB.y
        const da = (this.prize.x * this.buttonB.y) - (this.buttonB.x * this.prize.y);
        // buttonA.x prize.x
        // buttonA.y prize.y
        const db = (this.buttonA.x * this.prize.y) - (this.prize.x * this.buttonA.y);

        const a = da / d;
        const b = db / d;

        if (!Number.isInteger(a) || !Number.isInteger(b)) return 0;

        return (a * 3) + b;
    }

}

type Pair = {
    x: number,
    y: number
}

export type PlayResult = {
    won: boolean;
    cost: number;
}