export class Data{
    reports: Report[];

    constructor(input: string) {
        const lines = input.split("\n");
        const reports: Report[] = [];

        for (const line of lines) {
            reports.push(new Report(line));
        }

        this.reports = reports;
    }
}

class Report {
    levels: number[]

    constructor(input: string) {
        const levels: number[] = [];

        for (const num of input.split(" ")) {
            levels.push(parseInt(num));
        }

        this.levels = levels;
    }

    public calculateDistances(): number[] {
        return Report.calculateDistances(this.levels);
    }

    public calculateToleratedDistancesList(): number[][] {
        const distancesList: number[][] = [this.calculateDistances()];
        const levelsList: number[][] = [];

        for (let i = 0; i < this.levels.length; i++) {
            levelsList.push(this.levels.toSpliced(i, 1));
        }

        for (const levels of levelsList) {
            distancesList.push(Report.calculateDistances(levels));
        }

        return distancesList;
    }

    static calculateDistances(levels: number[]) {
        const distances: number[] = [];

        for (const [i, currentLevel] of levels.entries()) {
            if (i === 0) continue;

            const previousLevel = levels[i - 1];

            const distance = currentLevel - previousLevel;

            distances.push(distance);
        }

        return distances;
    }

    static isDescending(distances: number[]): boolean {
        return distances.every(distance => [-1, -2, -3].includes(distance));
    }
    
    static isAscending(distances: number[]): boolean {
        return distances.every(distance => [1, 2, 3].includes(distance));
    }

    public isSafe(problemDampener = false): boolean {
        if (problemDampener) {
            const distancesList = this.calculateToleratedDistancesList();
            
            return distancesList.some(distances => Report.isAscending(distances) || Report.isDescending(distances));
        } else {
            return Report.isAscending(this.calculateDistances()) || Report.isDescending(this.calculateDistances());
        }
    }
}