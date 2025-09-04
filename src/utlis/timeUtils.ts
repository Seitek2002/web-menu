export type DayWindow = { start: string; end: string };
export type TodayWindowResult = {
  window: DayWindow | null;
  isClosed: boolean;
};

/**
 * Parse schedule like "HH:MM-HH:MM" into day window.
 * If both equal => 24/7.
 */
export function parseSchedule(schedule?: string): { window: DayWindow | null; is247: boolean } {
  if (!schedule || !schedule.includes('-')) return { window: null, is247: false };
  const [startRaw, endRaw] = schedule.split('-');
  const start = (startRaw || '').trim();
  const end = (endRaw || '').trim();
  if (!/^\d{2}:\d{2}$/.test(start) || !/^\d{2}:\d{2}$/.test(end)) {
    return { window: null, is247: false };
  }
  const is247 = start === end;
  return { window: { start, end }, is247 };
}

/**
 * Given an optional weekly schedules object (unknown shape) and fallback daily schedule string,
 * returns today's window. For now we use fallback schedule if provided.
 * You can extend this to read weekly schedules like:
 * { mon: "09:00-18:00", tue: "..." } using new API later.
 */
export function getTodayScheduleWindow(
  schedules?: unknown,
  fallbackSchedule?: string
): TodayWindowResult {
  const { window, is247 } = parseSchedule(fallbackSchedule);
  if (is247) return { window: { start: '00:00', end: '00:00' }, isClosed: false };
  if (!window) return { window: null, isClosed: false }; // unknown -> do not block
  return { window, isClosed: false };
}

/**
 * Check if current time is outside given window. Supports overnight windows (e.g. 22:00-06:00).
 * If window is null -> treat as open (do not block).
 */
export function isOutsideWorkTime(win: DayWindow | null): boolean {
  if (!win) return false;

  const [sh, sm] = win.start.split(':').map(Number);
  const [eh, em] = win.end.split(':').map(Number);

  const startTotal = sh * 60 + sm;
  const endTotal = eh * 60 + em;

  const now = new Date();
  const nowTotal = now.getHours() * 60 + now.getMinutes();

  // 24/7 guard
  if (startTotal === endTotal) return false;

  if (startTotal < endTotal) {
    // same-day window
    const open = nowTotal >= startTotal && nowTotal < endTotal;
    return !open;
  } else {
    // overnight window
    const open = nowTotal >= startTotal || nowTotal < endTotal;
    return !open;
  }
}
