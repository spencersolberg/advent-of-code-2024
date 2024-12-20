import { Layout } from "./lib/linenLayout.ts";

const input = `r, wr, b, g, bwu, rb, gb, br

brwrr
bggr
gbbr
rrbgbr
ubwu
bwurrg
brgr
bbrgwb`;

const layout = Layout.fromString(input);

Deno.bench({
    name: "design loop",
    fn() {
        for (const design of layout.designs) {
            design.isPossible(layout.patterns);
        }
    }
})

Deno.bench({
    name: "get possibilties",
    fn() {
        for (const design of layout.designs) {
            design.getPossibilities(layout.patterns);
        }
    }
})