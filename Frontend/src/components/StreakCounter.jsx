import React from 'react';

function StreakCounter({ streak }) {
  return (
    <div className="streak-counter">
      🔥 Current Streak: {streak} day{streak !== 1 ? 's' : ''}{' '}
    </div>
  );
}

export default StreakCounter;
