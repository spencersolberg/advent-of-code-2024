import { Warehouse, Tile } from "./lib/warehouseWoes.ts";

const warehouse = Warehouse.fromString(await Deno.readTextFile("./input.txt"));

while (warehouse.moves.length > 0) {
    warehouse.processMove();
}

// console.log(warehouse.toString());

let sum = 0;

for (const [r, row] of warehouse.rows.entries()) {
    for (const [c, tile] of row.entries()) {
        if (tile === Tile.Box) {
            sum += Warehouse.getGpsCoordinate({ row: r, column: c });
        }
    }
}

console.log(sum);