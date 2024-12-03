export class Memory {
    instructions: Instruction[];

    constructor(input: string) {
        const instructions: Instruction[] = [];
        const matches =
            input.match(/mul\(\d{1,3},\d{1,3}\)|do\(\)|don't\(\)/gm) ?? [];

        for (const match of matches) {
            instructions.push(Memory.parseInstruction(match));
        }

        this.instructions = instructions;
    }

    get multiplyInstructions(): MultiplyInstruction[] {
        return this.instructions.filter((instruction) =>
            instruction instanceof MultiplyInstruction
        );
    }

    static parseInstruction(input: string): Instruction {
        // mul
        // do(
        // don
        switch (input.charAt(2)) {
            case "l": {
                return new MultiplyInstruction(input);
            }
            case "(": {
                return ConditionalInstruction.DoInstruction;
            }
            default: { // case "n"
                return ConditionalInstruction.DontInstruction;
            }
        }
    }

    public sum(): number {
        let enabled = true;
        let sum = 0;
        for (const instruction of this.instructions) {
            if (instruction instanceof MultiplyInstruction) {
                if (enabled) sum += instruction.product;
            } else enabled = Boolean(instruction)
        }

        return sum;
    }
}

type Instruction = ConditionalInstruction | MultiplyInstruction;

enum ConditionalInstruction {
    DontInstruction = 0,
    DoInstruction = 1,
}

class MultiplyInstruction {
    factor1: number;
    factor2: number;

    constructor(input: string) {
        const [_, factor1, factor2] =
            [...input.matchAll(/mul\((\d{1,3}),(\d{1,3})\)/gm)][0];

        this.factor1 = parseInt(factor1);
        this.factor2 = parseInt(factor2);
    }

    get product() {
        return this.factor1 * this.factor2;
    }
}