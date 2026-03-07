import dayjs from "dayjs";

export function calculateStreak(activityMap) {
  const dates = Object.keys(activityMap).sort(); // sort ascending

  if (dates.length === 0) return 0;

  let streak = 1;

  for (let i = dates.length - 1; i > 0; i--) {
    const current = dayjs(dates[i]);
    const previous = dayjs(dates[i - 1]);

    const diff = current.diff(previous, "day");

    if (diff === 1) {
      streak++;
    } else {
      break;
    }
  }

  return streak;
}
