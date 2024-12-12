export class StoneFormation {
    stones: Map<number, number>;
    constructor(stones: Map<number, number>) {
        this.stones = stones;
    }

    static fromString(input: string) {
        const stones: Map<number, number> = new Map();

        for (const num of input.split(" ")) {
            const stoneNumber = parseInt(num);
            const stoneCount = (stones.get(stoneNumber) ?? 0) + 1
            stones.set(stoneNumber, stoneCount)
        }

        return new StoneFormation(stones);
    }

    public blink() {
        const newStoneMap: Map<number, number> = new Map();

        for (const [oldStoneNumber, oldStoneCount] of this.stones) {
            switch (true) {
                case oldStoneNumber === 0: {
                    const stoneNumber = 1;
                    const stoneCount = (newStoneMap.get(stoneNumber) ?? 0) + oldStoneCount;
                    newStoneMap.set(stoneNumber, stoneCount);
                    break;
                }
                case StoneFormation.getDigits(oldStoneNumber) % 2 === 0: {
                    for (const stoneNumber of StoneFormation.splitStone(oldStoneNumber)) {
                        const stoneCount = (newStoneMap.get(stoneNumber) ?? 0) + oldStoneCount;
                        newStoneMap.set(stoneNumber, stoneCount);
                    }
                    break;
                }
                default: {
                    const stoneNumber = oldStoneNumber * 2024;
                    const stoneCount = (newStoneMap.get(stoneNumber) ?? 0) + oldStoneCount;
                    newStoneMap.set(stoneNumber, stoneCount);
                }
            }
        }
        this.stones = newStoneMap;
    }

    static getDigits(number: number): number {
        return number.toString().length
    }

    static splitStone(number: number): number[] {
        const digitsArray = number.toString().split("");

        const first = digitsArray.slice(0, digitsArray.length / 2);
        const second = digitsArray.slice(digitsArray.length / 2);

        const firstNum = parseInt(first.join(""));
        const secondNum = parseInt(second.join(""));

        return [firstNum, secondNum];
    }

    get length() {
        return this.stones.values().reduce((a, b) => a + b, 0);
    }
}
