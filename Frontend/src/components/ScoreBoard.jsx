import React from 'react';

function ScoreBoard({ score, solved }) {
  return (
    <div className="score-board">
      {' '}
      <p>Score: {score}</p> <p>Puzzles Solved: {solved}</p>{' '}
    </div>
  );
}

export default ScoreBoard;
