import { monthlyStories } from './monthly-story-data.mjs';

export const releaseDays = [1, 7, 14, 21, 28];
const firstYear = ['Cas','Ori','Tau','Gem','Leo','UMa','Vir','Boo','Sco','Lyr','Cyg','Peg'];
const ordered = [...firstYear, ...monthlyStories.map(s => s.id).filter(id => !firstYear.includes(id))];
export const editions = ordered.map(id => monthlyStories.find(s => s.id === id));
export const firstMonth = 2026 * 12 + 10;

export function releaseMonth(id) {
  const slot = firstMonth + ordered.indexOf(id);
  return Math.floor(slot / 12) + '-' + String(slot % 12 + 1).padStart(2, '0');
}

export function currentStory(day) {
  const slot = Number(day.slice(0, 4)) * 12 + Number(day.slice(5, 7)) - 1 - firstMonth;
  return editions[slot] || null;
}

export function status(state, story, day) {
  const month = releaseMonth(story.id), now = day.slice(0, 7);
  const due = now > month ? 5 : now < month ? 0 : releaseDays.filter(d => d <= Number(day.slice(-2))).length;
  const saved = state.monthlySky?.entries?.[story.id];
  const travelers = Array.isArray(saved?.travelers) ? saved.travelers.slice(0, 5).filter(n => typeof n === 'string') : [];
  const opened = Math.min(due, travelers.length);
  return {due, opened, credits:travelers.length, travelers, sender:opened === 5 ? travelers[4] : '', cardSeen:saved?.cardSeen === true};
}

export function activeStory(state, day) {
  const selected = editions.find(s => s.id === state.monthlySky?.target);
  if (selected && releaseMonth(selected.id) <= day.slice(0,7) && status(state,selected,day).credits < 5) return selected;
  return currentStory(day);
}

export function selectStory(state, story, day) {
  if (!story || releaseMonth(story.id) > day.slice(0,7) || status(state,story,day).credits >= 5) return false;
  state.monthlySky ??= {entries:{}};
  state.monthlySky.target = story.id;
  return true;
}

export function creditReturn(state, name, day) {
  const story = activeStory(state, day);
  if (!story) return null;
  const old = status(state,story,day);
  if (old.credits >= 5) return null;
  const book = state.monthlySky ??= {};
  book.entries ??= {};
  const entry = book.entries[story.id] ??= {};
  entry.creditDays = old.travelers.map((_, i) => entry.creditDays?.[i] ?? null).concat(day);
  entry.travelers = [...old.travelers, name];
  entry.cardSeen = false;
  if (old.credits === 4) entry.finalPending = true;
  if (old.credits === 4 && book.target === story.id) delete book.target;
  return {story, opened:Math.min(old.due,old.credits+1) > old.opened};
}


// Older saves retained travelers, but no receipt dates. Keep those chapters undated.
export function collectedChapters(state, today) {
  const chapters = [];
  for (const story of editions) {
    const entry = state.monthlySky?.entries?.[story.id];
    if (!entry) continue;
    const {opened} = status(state, story, today);
    for (let index = 0; index < opened; index++) {
      const receipt = entry.creditDays?.[index];
      const release = releaseMonth(story.id) + '-' + String(releaseDays[index]).padStart(2, '0');
      const date = typeof receipt === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(receipt)
        ? (receipt > release ? receipt : release) : null;
      chapters.push({story, index, date, fresh: Boolean(date) && !entry.read?.includes(index)});
    }
  }
  return chapters.reverse().sort((a,b) => (b.date || '').localeCompare(a.date || ''));
}

export function markChapterRead(state, story, index, day) {
  if (!story || !Number.isInteger(index) || index < 0 || index >= status(state,story,day).opened) return false;
  const entry = state.monthlySky.entries[story.id];
  entry.read ??= [];
  if (entry.read.includes(index)) return false;
  entry.read.push(index);
  return true;
}

export function pendingFinalStory(state, day) {
  return editions.find(story => state.monthlySky?.entries?.[story.id]?.finalPending === true
    && status(state,story,day).opened === 5) || null;
}
