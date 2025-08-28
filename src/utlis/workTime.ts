export function isClosedNow(schedule: string): boolean {
  try {
    if (!schedule || !schedule.includes('-')) {
      // If schedule is unknown, do not block by default
      return false;
    }

    const [startTimeStr, endTimeStr] = schedule.split('-');
    const [startHours, startMinutes] = startTimeStr.split(':').map(Number);
    const [endHours, endMinutes] = endTimeStr.split(':').map(Number);

    const now = new Date();
    const nowHours = now.getHours();
    const nowMinutes = now.getMinutes();

    const startTotalMinutes = startHours * 60 + startMinutes;
    const endTotalMinutes = endHours * 60 + endMinutes;
    const nowTotalMinutes = nowHours * 60 + nowMinutes;

    // Equal start/end means 24/7 open
    if (startTotalMinutes === endTotalMinutes) {
      return false; // open
    }

    if (startTotalMinutes < endTotalMinutes) {
      // Same-day schedule, e.g. 09:00-18:00
      const isOpen =
        nowTotalMinutes >= startTotalMinutes && nowTotalMinutes < endTotalMinutes;
      return !isOpen;
    } else {
      // Overnight schedule, e.g. 22:00-06:00
      const isOpen =
        nowTotalMinutes >= startTotalMinutes || nowTotalMinutes < endTotalMinutes;
      return !isOpen;
    }
  } catch {
    // On parsing errors, do not block
    return false;
  }
}
