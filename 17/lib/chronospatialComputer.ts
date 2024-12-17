export class Computer {
    registerA: number;
    registerB: number;
    registerC: number;
    program: number[];

    output: number[];
    instructionPointer: number;

    constructor(registerA: number, registerB: number, registerC: number, program: number[]) {
        this.registerA = registerA;
        this.registerB = registerB;
        this.registerC = registerC;
        this.program = program;
        this.output = [];
        this.instructionPointer = 0;
    }

    static fromString(input: string): Computer {
        const lines = input.split("\n");

        const registerA = parseInt(lines[0].split(": ")[1]);
        const registerB = parseInt(lines[1].split(": ")[1]);
        const registerC = parseInt(lines[2].split(": ")[2]);
        
        const program = lines[4].split(": ")[1].split(",").map(num => parseInt(num));

        return new Computer(registerA, registerB, registerC, program);
    }

    private getCombo(operand: number): number {
        switch (operand) {
            case 4: return this.registerA;
            case 5: return this.registerB;
            case 6: return this.registerC;
            case 7: throw new Error("No combo operand for 7")
            default: return operand;
        }
    }

    public executeInstruction() {
        // const combos = [
        //     0,
        //     1,
        //     2,
        //     3,
        //     this.registerA,
        //     this.registerB,
        //     this.registerC
        // ]
        
        // const combos = (operand: number): number => {
        //     switch (operand) {
        //         case 4: return this.registerA;
        //         case 5: return this.registerB;
        //         case 6: return this.registerC;
        //         case 7: throw new Error("No combo operand for 7")
        //         default: return operand;
        //     }
        // }
        // const [opcode, operand] = this.program.slice(this.instructionPointer);
        const opcode = this.program[this.instructionPointer];
        const operand = this.program[this.instructionPointer + 1];

        switch (opcode as Instruction) {
            case Instruction.Adv: {
                const numerator = this.registerA;
                // const denominator = Math.pow(2, combos[operand]);
                const denominator = Number(1n << BigInt(this.getCombo(operand)));
                const quotient = numerator / denominator;

                this.registerA = Math.trunc(quotient);
                this.instructionPointer +=2;
                
                break;
            }
            case Instruction.Bxl: {
                // const xor = this.registerB ^ operand;
                const xor = Number(BigInt(this.registerB) ^ BigInt(operand));
                
                this.registerB = xor;
                this.instructionPointer +=2;

                break;
            }
            case Instruction.Bst: {
                const remainder = this.getCombo(operand) % 8;
                // const remainder = Number(BigInt(combos[operand]) & BigInt(7)); // keep the last 3 bits

                this.registerB = remainder;
                this.instructionPointer += 2;

                break;
            }
            case Instruction.Jnz: {
                if (this.registerA === 0) {
                    this.instructionPointer += 2;
                    break;
                }

                this.instructionPointer = operand;
                break;
            }
            case Instruction.Bxc: {
                // const xor = this.registerB ^ this.registerC;
                const xor = Number(BigInt(this.registerB) ^ BigInt(this.registerC));

                this.registerB = xor;
                this.instructionPointer += 2;

                break;
            }
            case Instruction.Out: {
                const remainder = this.getCombo(operand) % 8;
                // const remainder = Number(BigInt(combos[operand]) & BigInt(7)); // keep the last 3 bits

                this.output.push(remainder);
                this.instructionPointer += 2;

                break;
            }
            case Instruction.Bdv: {
                const numerator = this.registerA;
                // const denominator = Math.pow(2, combos[operand]);
                const denominator = Number(1n << BigInt(this.getCombo(operand)));
                const quotient = numerator / denominator;

                this.registerB = Math.trunc(quotient);
                this.instructionPointer +=2;
                
                break;
            }
            case Instruction.Cdv: {
                const numerator = this.registerA;
                // const denominator = Math.pow(2, combos[operand]);
                const denominator = Number(1n << BigInt(this.getCombo(operand)));                
                const quotient = numerator / denominator;

                this.registerC = Math.trunc(quotient);
                // this.registerC = quotient | 0;
                this.instructionPointer +=2;
                
                break;
            }
        }
    }

    public runProgram() {
        while (this.instructionPointer < this.program.length) {
            this.executeInstruction();
        }
    }

    public clone(): Computer {
        return new Computer(this.registerA, this.registerB, this.registerC, this.program);
    }
}

enum Instruction {
    Adv,
    Bxl,
    Bst,
    Jnz,
    Bxc,
    Out,
    Bdv,
    Cdv
}