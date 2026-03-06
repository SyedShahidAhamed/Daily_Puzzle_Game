import { dbPromise } from '../db/indexedDB';

export async function syncDailyScores() {
  const db = await dbPromise;

  const all = await db.getAll('dailyActivity');

  const unsynced = all.filter((item) => !item.synced);

  if (unsynced.length === 0) return;

  const payload = unsynced.map((item) => ({
    date: item.date,
    score: item.score,
    timeTaken: item.timeTaken
  }));

  try {
    await fetch('http://localhost:5000/sync/daily-scores', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ entries: payload })
    });

    for (const entry of unsynced) {
      entry.synced = true;
      await db.put('dailyActivity', entry);
    }

    console.log('Batch sync successful');
  } catch (err) {
    console.error('Sync failed', err);
  }
}
