export class DiskMap {
    layout: DiskMapLayout;

    constructor(layout: DiskMapLayout) {
        this.layout = layout;
    }

    static fromString(input: string): DiskMap {
        const layout: DiskMapLayout = [];

        for (const [i, l] of input.split("").entries()) {
            switch (i % 2) {
                case 0: {
                    layout.push(new File(parseInt(l), i / 2));
                    break;
                }
                case 1: {
                    layout.push(new FreeSpace(parseInt(l)));
                    break;
                }
            }
        }

        return new DiskMap(layout);
    }

    public toString(): string {
        let string = "";
        for (const block of this.layout) {
            if (block instanceof File) {
                string += block.id.toString().repeat(block.length);
            } else {
                string += ".".repeat(block.length);
            }
        }

        return string;
    }

    public splitBlocksIntoBits() {
        const layout: DiskMapLayout = [];

        for (const block of this.layout) {
            if (block instanceof File) {
                for (let i = 0; i < block.length; i++) {
                    layout.push(new File(1, block.id));
                }
            } else {
                for (let i = 0; i < block.length; i++) {
                    layout.push(new FreeSpace(1));
                }
            }
        }

        this.layout = layout;
    }
    public splitFreeSpaceIntoBits() {
        const layout: DiskMapLayout = [];

        for (const block of this.layout) {
            if (block instanceof FreeSpace) {
                for (let i = 0; i < block.length; i++) {
                    layout.push(new FreeSpace(1));
                }
            } else {
                layout.push(block);
            }
        }

        this.layout = layout;
    }

    public isFreeSpaceAtEnd(): boolean {
        let hitFreeSpace = false;
        let i = 0;
        for (const block of this.layout) {
            i++;
            if (block instanceof File) {
                if (hitFreeSpace) return false;
            } else {
                hitFreeSpace = true;
            }
        }

        return true;
    }

    public indexOfLastFile(): number {
        return this.layout.findLastIndex(block => block instanceof File);
    }

    public indexOfFirstFreeSpace(): number {
        return this.layout.findIndex(block => block instanceof FreeSpace);
    }

    public swapBlocks(firstIndex: number, secondIndex: number) {
        const temp = this.layout[firstIndex];
        this.layout[firstIndex] = this.layout[secondIndex];
        this.layout[secondIndex] = temp;
    }

    get files(): File[] {
        return this.layout.filter(block => block instanceof File);
    }

    public getFile(id: number): File | undefined {
        return this.layout.find(block => block instanceof File && block.id === id) as File;
    }

    // public indexOfFreeSpace(requiredLength: number, lessThan: number): number | null {
    //     const string = this.toString();
    //     const search = ".".repeat(requiredLength);
    //     const match = string.indexOf(search);

    //     // console.log({ string, search, match });

    //     if (match >= 0 && match < lessThan) { return match; } else return null;
    // }

    public indexOfFreeSpace(requiredLength: number, lessThan: number): number | null {
        let currentBlockIndex = 0;
        let onFreeSpace = false;
        let freeSpaceCount = 0;
        for (const [i, block] of this.layout.entries()) {
            onFreeSpace = block instanceof FreeSpace;

            if (onFreeSpace) {
                freeSpaceCount++;
            } else {
                currentBlockIndex = i + 1;
                freeSpaceCount = 0;
            }

            if (freeSpaceCount === requiredLength && i < lessThan) return currentBlockIndex;
        }

        return null;
    }

    public swapFileWithFreeSpace(fileIndex: number, freeSpaceIndex: number) {
        const file = this.layout[fileIndex] as File;
        const freeSpace = new Array(file.length).fill(new FreeSpace(1));
        const beginning = this.layout.slice(0, freeSpaceIndex);
        // console.log({ beginning, freeSpaceIndex })
        const middle = this.layout.slice(freeSpaceIndex + file.length, fileIndex);
        const end = this.layout.slice(fileIndex + 1);

        this.layout = [...beginning, file, ...middle, ...freeSpace, ...end];
    }

    public indexOfFile(fileId: number): number {
        return this.layout.findIndex(block => block instanceof File && block.id === fileId);
    }

}

export class File {
    length: number;
    id: number;

    constructor(length: number, id: number) {
        this.length = length;
        this.id = id;
    }

    public decrement() {
        if (this.length - 1 === 0) throw new Error("File length cannot be 0 blocks long (delete file)");
        this.length--;
    }
}

class FreeSpace {
    length: number;

    constructor(length: number) {
        this.length = length;
    }
    public decrement() {
        if (this.length - 1 === 0) throw new Error("Free space cannot be 0 blocks long (deallocate space)");
        this.length--;
    }
}

type DiskMapLayout = Array<File|FreeSpace>;