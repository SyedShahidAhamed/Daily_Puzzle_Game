import { generatePuzzle } from "../utils/puzzleGenerator";

test("generatePuzzle returns a valid puzzle", () => {
const puzzle = generatePuzzle();

expect(puzzle).toHaveProperty("question");
expect(puzzle).toHaveProperty("answer");
});
