export const getCurrentMonth = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  return `${year}-${month}`;
};

export const getTodayDateString = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const formatDisplayDate = (dateStr) => {
  if (!dateStr) return 'No date';
  try {
    const [year, month, day] = dateStr.split('-').map(Number);
    const date = new Date(year, month - 1, day);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  } catch {
    return dateStr;
  }
};

export const formatMonthDisplay = (yearMonthStr) => {
  if (!yearMonthStr) return '';
  try {
    const [year, month] = yearMonthStr.split('-').map(Number);
    const date = new Date(year, month - 1, 1);
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  } catch {
    return yearMonthStr;
  }
};

/**
 * Calculates days remaining from today until a target date.
 * Returns:
 * {
 *   days: number (positive for future, negative for past, 0 for today),
 *   isPast: boolean,
 *   isToday: boolean,
 *   text: string (e.g., "12 days left", "Today!", "Concert passed")
 * }
 */
export const calculateCountdown = (targetDateStr) => {
  if (!targetDateStr) return { days: 0, isPast: false, isToday: false, text: 'Date TBA' };

  try {
    const [tYear, tMonth, tDay] = targetDateStr.split('-').map(Number);
    const targetDate = new Date(tYear, tMonth - 1, tDay);

    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    const diffTime = targetDate.getTime() - today.getTime();
    const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      return { days: 0, isPast: false, isToday: true, text: 'TODAY! 🎉' };
    } else if (diffDays === 1) {
      return { days: 1, isPast: false, isToday: false, text: 'Tomorrow! 🌟' };
    } else if (diffDays > 1) {
      return { days: diffDays, isPast: false, isToday: false, text: `${diffDays} days left` };
    } else {
      return { days: Math.abs(diffDays), isPast: true, isToday: false, text: `${Math.abs(diffDays)} days ago` };
    }
  } catch {
    return { days: 0, isPast: false, isToday: false, text: 'Invalid date' };
  }
};

/**
 * Generates an array of date cells for a monthly calendar grid.
 */
export const getMonthGrid = (year, monthIndex) => {
  const firstDayOfMonth = new Date(year, monthIndex, 1);
  const startingDayOfWeek = firstDayOfMonth.getDay(); // 0 = Sunday, 1 = Monday...
  const totalDaysInMonth = new Date(year, monthIndex + 1, 0).getDate();

  const prevMonthTotalDays = new Date(year, monthIndex, 0).getDate();

  const days = [];

  // Previous month trailing days
  for (let i = startingDayOfWeek - 1; i >= 0; i--) {
    const dayNum = prevMonthTotalDays - i;
    const prevMonth = monthIndex === 0 ? 11 : monthIndex - 1;
    const prevYear = monthIndex === 0 ? year - 1 : year;
    const dateStr = `${prevYear}-${String(prevMonth + 1).padStart(2, '0')}-${String(dayNum).padStart(2, '0')}`;
    days.push({
      dateStr,
      dayNumber: dayNum,
      isCurrentMonth: false
    });
  }

  // Current month days
  for (let d = 1; d <= totalDaysInMonth; d++) {
    const dateStr = `${year}-${String(monthIndex + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
    days.push({
      dateStr,
      dayNumber: d,
      isCurrentMonth: true
    });
  }

  // Next month leading days to complete the 35 or 42 grid cells
  const remaining = (7 - (days.length % 7)) % 7;
  for (let n = 1; n <= remaining; n++) {
    const nextMonth = monthIndex === 11 ? 0 : monthIndex + 1;
    const nextYear = monthIndex === 11 ? year + 1 : year;
    const dateStr = `${nextYear}-${String(nextMonth + 1).padStart(2, '0')}-${String(n).padStart(2, '0')}`;
    days.push({
      dateStr,
      dayNumber: n,
      isCurrentMonth: false
    });
  }

  return days;
};
