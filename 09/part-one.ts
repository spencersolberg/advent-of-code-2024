import { DiskMap } from "./lib/diskMap.ts";

const diskMap = DiskMap.fromString(await Deno.readTextFile("./input.txt"));

diskMap.splitBlocksIntoBits();
while (!diskMap.isFreeSpaceAtEnd()) {
    diskMap.swapBlocks(diskMap.indexOfFirstFreeSpace(), diskMap.indexOfLastFile());
}

let sum = 0;

for (const [i, file] of diskMap.files.entries()) {
    sum += (i * file.id);
}

console.log(sum);