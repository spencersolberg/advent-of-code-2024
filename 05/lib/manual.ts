export class Manual {
    orderingRules: OrderingRule[];
    updates: Update[];

    constructor(input: string) {
        const [orderingRulesString, updatesString] = input.split("\n\n");
        const orderingRules: OrderingRule[] = [];

        for (const line of orderingRulesString.split("\n")) {
            const [first, last] = line.split("|");

            orderingRules.push({ first: parseInt(first), last: parseInt(last) });
        }

        const updates: Update[] = [];

        for (const line of updatesString.split("\n")) {
            updates.push(new Update(line));
        }

        this.orderingRules = orderingRules;
        this.updates = updates;
    }
}

type OrderingRule = {
    first: number;
    last: number;
}

export class Update {
    pageNumbers: number[];

    constructor(input: string) {
        const pageNumbers: number[] = [];

        for (const num of input.split(",")) {
            pageNumbers.push(parseInt(num));
        }

        this.pageNumbers = pageNumbers;
    }

    get middle() {
        return this.pageNumbers[Math.floor(this.pageNumbers.length / 2)];
    }

    public checkOrder(rules: OrderingRule[]): boolean {
        for (const rule of rules) {
            if (this.pageNumbers.includes(rule.first) && this.pageNumbers.includes(rule.last)) {
                if (this.pageNumbers.indexOf(rule.first) < this.pageNumbers.indexOf(rule.last)) continue;
                return false;
            }
        }

        return true;
    }
    public repairUpdate(rules: OrderingRule[]): Update {
        let pageNumbers = this.pageNumbers;
        for (let p = 0; p < pageNumbers.length; p++) {
            const relevantRules = rules.filter(rule => rule.last === pageNumbers[p]);

            if (relevantRules.every(rule => pageNumbers.indexOf(rule.first) < pageNumbers.indexOf(rule.last))) continue; // it's in a good spot, we can p++

            // otherwise we need to shift that page number one spot to the right and reset p to 0.
            const farthest = Math.max(...relevantRules.map(rule => pageNumbers.indexOf(rule.first)));
            pageNumbers = Update.moveElement(pageNumbers, p, farthest)
            p = 0;
        }

        let newUpdate = new Update(pageNumbers.join(","));
        if (!newUpdate.checkOrder(rules)) {
            newUpdate = newUpdate.repairUpdate(rules); // do it again if it doesn't work? I don't know what I did wrong to warrant this lol
        }
        return newUpdate;
    }
    
    static moveElement(numbers: number[], from: number, to: number): number[] {
        const backup = numbers[from];
        const without = numbers.toSpliced(from, 1);
        const newArray = without.toSpliced(to, 0, backup);

        return newArray;
    }
}