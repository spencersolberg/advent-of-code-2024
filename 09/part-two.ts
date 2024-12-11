import { DiskMap, File } from "./lib/diskMap.ts";

const diskMap = DiskMap.fromString(await Deno.readTextFile("./input.txt"));

diskMap.splitFreeSpaceIntoBits();

// console.log(diskMap);

const highestId = diskMap.files.length - 1;
// console.log(diskMap.toString());


for (let i = highestId; i >= 0; i--) {
    // console.log(i);
    const file = diskMap.getFile(i)!;
    const fileIndex = diskMap.indexOfFile(i);
    // console.log(`Finding free space for ${file.id} with length ${file.length} @ ${fileIndex}`)
    const freeSpaceIndex = diskMap.indexOfFreeSpace(file.length, fileIndex);
    // console.log({ freeSpaceIndex });
    // console.log({ i, file, fileIndex, freeSpaceIndex });

    if (freeSpaceIndex) {
        diskMap.swapFileWithFreeSpace(fileIndex, freeSpaceIndex);
    }
    // console.log(diskMap.toString());
}

diskMap.splitBlocksIntoBits();

// console.log(diskMap);

let sum = 0;

for (const [i, block] of diskMap.layout.entries()) {
    if (block instanceof File) {
        sum += (i * block.id);
    }
}

console.log(sum);