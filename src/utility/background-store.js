const DB_NAME = "p-restige-bg";
const STORE = "images";
const KEY = "current";

function openDB() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, 1);
    req.onupgradeneeded = () => req.result.createObjectStore(STORE);
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

async function dbPut(blob) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE, "readwrite");
    tx.objectStore(STORE).put(blob, KEY);
    tx.oncomplete = resolve;
    tx.onerror = () => reject(tx.error);
  });
}

async function dbGet() {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const req = db.transaction(STORE, "readonly").objectStore(STORE).get(KEY);
    req.onsuccess = () => resolve(req.result || null);
    req.onerror = () => reject(req.error);
  });
}

async function dbDelete() {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE, "readwrite");
    tx.objectStore(STORE).delete(KEY);
    tx.oncomplete = resolve;
    tx.onerror = () => reject(tx.error);
  });
}

let currentURL = null;

function applyBlob(blob) {
  if (currentURL) {
    URL.revokeObjectURL(currentURL);
    currentURL = null;
  }
  if (!blob) {
    document.documentElement.style.removeProperty("--bg-image");
    return;
  }
  currentURL = URL.createObjectURL(blob);
  document.documentElement.style.setProperty("--bg-image", `url("${currentURL}")`);
}

export const BgStore = {
  async init() {
    try {
      const blob = await dbGet();
      if (blob) applyBlob(blob);
      return !!blob;
    } catch (e) {
      console.warn("BgStore init failed:", e);
      return false;
    }
  },
  async set(file) {
    await dbPut(file);
    applyBlob(file);
  },
  async clear() {
    await dbDelete();
    applyBlob(null);
  },
  async has() {
    try { return !!(await dbGet()); } catch { return false; }
  },
};