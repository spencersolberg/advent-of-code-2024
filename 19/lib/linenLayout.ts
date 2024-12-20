import TinyQueue from "npm:tinyqueue";

export class Layout {
    patterns: string[];
    designs: Design[];

    constructor(patterns: string[], designs: Design[]) {
        this.patterns = patterns;
        this.designs = designs;
    }

    static fromString(input: string): Layout {
        const [patternsString, designsString] = input.split("\n\n");

        const patterns = patternsString.split(", ");
        const designs = designsString.split("\n").map(stripes => new Design(stripes));

        return new Layout(patterns, designs);
    }
}

export class Design {
    stripes: string;

    constructor(stripes: string) {
        this.stripes = stripes;
    }

    public isPossible(patterns: string[]): boolean {
        const queue = new TinyQueue<string>([], (a, b) => b.length - a.length);
        queue.push("");

        while (queue.length > 0) {
            const branch = queue.pop()!;
            const nextStripe = this.stripes[branch.length];
            for (const pattern of patterns.filter(pattern => pattern[0] === nextStripe)) {
                const newBranch = branch + pattern;
                if (newBranch.length > this.stripes.length) continue;

                if (this.stripes === newBranch) return true;

                if (this.stripes.startsWith(newBranch)) queue.push(newBranch);
            }
        }

        return false;
    }

    public getPossibilities(patterns: string[]): number {
        let possibilities = 0;

        const queue = new TinyQueue<string>([], (a, b) => b.length - a.length);
        queue.push("");

        while (queue.length > 0) {
            const branch = queue.pop()!;
            const nextStripe = this.stripes[branch.length];
            for (const pattern of patterns.filter(pattern => pattern[0] === nextStripe)) {
                const newBranch = branch + pattern;
                if (newBranch.length > this.stripes.length) continue;

                if (this.stripes === newBranch) {
                    possibilities++;
                    continue;
                };

                if (this.stripes.startsWith(newBranch)) queue.push(newBranch);
            }
        }

        return possibilities;
    }
}

