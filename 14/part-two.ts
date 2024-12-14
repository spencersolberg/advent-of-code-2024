import { Floor } from "./lib/restroomRedoubt.ts";
import { Image } from "https://deno.land/x/imagescript@1.2.15/mod.ts";

const floor = Floor.fromString(await Deno.readTextFile("./input.txt"), 101, 103);

for (let i = 0; i < 10000; i++) {
    floor.move();
    const text = floor.toString();
    const lines = text.split("\n");

    const img = new Image(101, 103);
    img.fill(0xfff);

    for (const [l, line] of lines.entries()) {
        for (const [c, char] of line.split("").entries()) {
            if (char !== ".") {
                img.drawBox(c, l, 1, 1, 0x000);
            }
        }
    }

    await Deno.writeFile(`./output/${i + 1}.png`, await img.encode());
} // let this run and search through the images!