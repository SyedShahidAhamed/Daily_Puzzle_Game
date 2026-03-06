import { openDB } from "idb";
import LZString from "lz-string";

const DB_NAME = "puzzle-db";
const STORE_NAME = "dailyActivity";

export const dbPromise = openDB(DB_NAME, 2, {
  upgrade(db) {
    console.log("Running DB upgrade...");

    if (!db.objectStoreNames.contains(STORE_NAME)) {
      db.createObjectStore(STORE_NAME, { keyPath: "date" });
    }
  }
});

export async function saveActivity(activity) {
  const db = await dbPromise;

  const compressed = LZString.compress(JSON.stringify(activity));

  await db.put(STORE_NAME, {
    date: activity.date,
    data: compressed
  });

  console.log("Saved activity:", activity.date);
}

export async function getAllActivities() {
  const db = await dbPromise;

  const records = await db.getAll(STORE_NAME);

  return records.map((item) =>
    JSON.parse(LZString.decompress(item.data))
  );
}