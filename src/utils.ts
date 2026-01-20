export function formatDate(date: Date) {
  return date.toISOString().split("T")[0];
}

export function isSameDate(date1: Date, date2: Date) {
  return formatDate(date1) === formatDate(date2);
}

export function isToday(date: Date) {
  return isSameDate(date, new Date());
}

export function isYesterday(date: Date) {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return isSameDate(date, yesterday);
}

const shortFormatter = new Intl.DateTimeFormat(undefined, {
  month: "short",
  day: "numeric",
});

export function formatDisplayDate(dateString: string) {
  const date = new Date(dateString + "T00:00:00");

  if (isToday(date)) {
    return "Today";
  } else if (isYesterday(date)) {
    return "Yesterday";
  } else {
    return shortFormatter.format(date);
  }
}
