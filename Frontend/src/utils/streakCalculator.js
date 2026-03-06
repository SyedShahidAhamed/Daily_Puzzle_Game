import dayjs from 'dayjs';

export function calculateStreak(activityMap) {
  let streak = 0;
  let current = dayjs();

  while (true) {
    const date = current.format('YYYY-MM-DD');

    if (activityMap[date]?.solved) {
      streak++;
      current = current.subtract(1, 'day');
    } else {
      break;
    }
  }

  return streak;
}
