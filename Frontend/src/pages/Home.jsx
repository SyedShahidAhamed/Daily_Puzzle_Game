import { useState, useEffect } from "react";
import PuzzleCard from "../components/PuzzleCard";
import PuzzleInput from "../components/PuzzleInput";
import ScoreBoard from "../components/ScoreBoard";
import HeatmapContainer from "../components/HeatmapContainer";
import { generatePuzzle } from "../utils/puzzleGenerator";
import { saveActivity } from "../db/indexedDB";
import { syncDailyScores } from "../services/syncService";
import dayjs from "dayjs";

const MAX_TIME = 30;

function Home() {
  const [puzzle, setPuzzle] = useState(null);
  const [score, setScore] = useState(0);
  const [solved, setSolved] = useState(0);
  const [isSolved, setIsSolved] = useState(false);
  const [refreshHeatmap, setRefreshHeatmap] = useState(false);
  const [timeLeft, setTimeLeft] = useState(MAX_TIME);

  useEffect(() => {
    loadNewPuzzle();
  }, []);

  useEffect(() => {
    if (isSolved) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsSolved(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isSolved]);

  const loadNewPuzzle = () => {
    setPuzzle(generatePuzzle());
    setIsSolved(false);
    setTimeLeft(MAX_TIME);
  };

  const handleSolved = async () => {
    if (isSolved) return;

    setIsSolved(true);

    const newScore = score + 10;
    const newSolved = solved + 1;

    setScore(newScore);
    setSolved(newSolved);

    const today = dayjs().format("YYYY-MM-DD");

    await saveActivity({
      date: today,
      solved: true,
      score: newScore,
      timeTaken: MAX_TIME - timeLeft,
      difficulty: 1,
      synced: false
    });

    setRefreshHeatmap((prev) => !prev);

    if (newSolved % 5 === 0) {
      syncDailyScores();
    }

    // Auto next puzzle
    setTimeout(() => {
      loadNewPuzzle();
    }, 1000);
  };

  return (
    <div>
      <h1>Daily Logic Puzzle</h1>
      <p>Solve today's puzzle and keep your streak alive 🔥</p>

      <ScoreBoard score={score} solved={solved} />

      <h3>⏳ Time Left: {timeLeft}s</h3>

      {puzzle && (
        <>
          <PuzzleCard question={puzzle.question} />

          <PuzzleInput
            key={puzzle.question}
            answer={puzzle.answer}
            onSolved={handleSolved}
            disabled={isSolved}
            timeUp={timeLeft === 0}
          />
        </>
      )}

      <HeatmapContainer refresh={refreshHeatmap} />
    </div>
  );
}

export default Home;
