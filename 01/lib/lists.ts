export class Lists {
    firstList: number[];
    secondList: number[];

    constructor(input: string) {
        const lines = input.split("\n");
        this.firstList = [];
        this.secondList = [];
        for (const line of lines) {
            const [_, firstId, secondId] = [...line.matchAll(/(\d+)\s+(\d+)/gm)][0];
            this.firstList.push(parseInt(firstId));
            this.secondList.push(parseInt(secondId));
        }
    }

    static sortList(list: number[]): number[] {
        return list.sort((a, b) => a - b);
    }

    public calculateDistance(): number {
        const sortedFirstList = Lists.sortList(this.firstList);
        const sortedSecondList = Lists.sortList(this.secondList);

        let sum = 0;

        for (const [i, firstId] of sortedFirstList.entries()) {
            const pair = new Pair(firstId, sortedSecondList[i]);
            sum += pair.calculateDistance();
        }

        return sum;
    }

    static countOccurences(list: number[]): Map<number, number> {
        const map: Map<number, number> = new Map();
        for (const num of list) {
            map.set(num, (map.get(num) ?? 0) + 1);
        }

        return map;
    }
    public calculateSimilarity(): number {
        const occurences = Lists.countOccurences(this.secondList);

        let sum = 0;
        for (const id of this.firstList) {
            sum += id * (occurences.get(id) ?? 0);
        }

        return sum;
    }
}

class Pair {
    firstId: number;
    secondId: number;

    constructor(firstId: number, secondId: number) {
        this.firstId = firstId;
        this.secondId = secondId;
    }

    public calculateDistance(): number {
        return Math.abs(this.firstId - this.secondId);
    }
}