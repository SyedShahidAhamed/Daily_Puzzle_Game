function StreakCounter({ streak }) {
  return (
    <div className="streak-counter">
      🔥 Current Streak: {streak} {streak === 1 ? "day" : "days"}
    </div>
  );
}

export default StreakCounter;
