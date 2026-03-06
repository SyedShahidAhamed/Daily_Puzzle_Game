import React, { useState, useEffect } from 'react';
import PuzzleCard from '../components/PuzzleCard';
import PuzzleInput from '../components/PuzzleInput';
import ScoreBoard from '../components/ScoreBoard';
import HeatmapContainer from '../components/HeatmapContainer';
import { generatePuzzle } from '../utils/puzzleGenerator';
import { saveActivity } from '../db/indexedDB';
import { syncDailyScores } from '../services/syncService';

function Home() {
  const [puzzle, setPuzzle] = useState(null);
  const [score, setScore] = useState(0);
  const [solved, setSolved] = useState(0);

  useEffect(() => {
    setPuzzle(generatePuzzle());
  }, []);

  const handleSolved = async () => {
    const newScore = score + 10;
    const newSolved = solved + 1;

    setScore(newScore);
    setSolved(newSolved);
    console.log("Puzzle solved");
    const today = new Date().toISOString().split('T')[0];

    await saveActivity({
      date: today,
      solved: true,
      score: newScore,
      timeTaken: 30,
      difficulty: 1,
      synced: false
    });

    // Batch sync every 5 puzzles
    if (newSolved % 5 === 0) {
      syncDailyScores();
    }
  };

  const nextPuzzle = () => {
    setPuzzle(generatePuzzle());
  };

  return (
    <div>
      {' '}
      <h1>Daily Logic Puzzle</h1>{' '}
      <p>Solve today's puzzle and keep your streak alive 🔥</p>
      <ScoreBoard score={score} solved={solved} />
      {puzzle && (
        <>
          <PuzzleCard question={puzzle.question} />
          <PuzzleInput answer={puzzle.answer} onSolved={handleSolved} />
        </>
      )}
      <button onClick={nextPuzzle}>Next Puzzle</button>
      <HeatmapContainer />
    </div>
  );
}

export default Home;
