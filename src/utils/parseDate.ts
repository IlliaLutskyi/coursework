export function parseDate(date: string) {
  const [d, m, y] = date.split("-");
  return `${y}-${m}-${d}`;
}
