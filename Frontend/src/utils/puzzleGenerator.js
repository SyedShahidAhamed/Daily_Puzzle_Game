export function generatePuzzle() {
  const a = Math.floor(Math.random() * 10) + 1;
  const b = Math.floor(Math.random() * 10) + 1;

  return {
    question: `${a} + ? = ${a + b}`,
    answer: b,
    difficulty: 1
  };
}
