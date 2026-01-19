// storage.ts
import { HistoryItem } from "./types";

const STORAGE_KEY = "savedConversations";

export function loadSavedConversations(): HistoryItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as HistoryItem[];
  } catch {
    return [];
  }
}

export function saveConversationToStorage(item: HistoryItem) {
  try {
    const list = loadSavedConversations();
    const existingIndex = list.findIndex((x) => x.id === item.id);

    if (existingIndex >= 0) {
      list[existingIndex] = item;
    } else {
      list.unshift(item);
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  } catch {}
}

export function deleteConversationFromStorage(id: string) {
  try {
    const list = loadSavedConversations().filter((x) => x.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  } catch {}
}
