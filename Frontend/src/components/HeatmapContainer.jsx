import React, { useEffect, useState } from 'react';
import HeatmapGrid from './HeatmapGrid';
import StreakCounter from './StreakCounter';
import { getAllActivities } from '../db/indexedDB';
import { calculateStreak } from '../utils/streakCalculator';
import dayjs from 'dayjs';

function HeatmapContainer() {
  const [activityMap, setActivityMap] = useState({});
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    async function loadActivity() {
      const activities = await getAllActivities();
      console.log("IndexedDB data:", activities);
      const map = {};
      activities.forEach((item) => {
        map[item.date] = item;
      });
        
      setActivityMap(map);
      setStreak(calculateStreak(map));
    }

    loadActivity();
  }, []);

  const startOfYear = dayjs().startOf('year');
  const days = [];

  for (let i = 0; i < 365; i++) {
    days.push(startOfYear.add(i, 'day').format('YYYY-MM-DD'));
  }

  return (
    <div>
      {' '}
      <h2>Activity Heatmap</h2>
      <StreakCounter streak={streak} />
      <HeatmapGrid days={days} activity={activityMap} />
    </div>
  );
}

export default HeatmapContainer;
