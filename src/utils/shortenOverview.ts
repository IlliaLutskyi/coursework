export function shortenText(overview: string, fraction: number): string {
  let breakPoint = 0;
  for (
    let i = Math.round(overview.length * fraction);
    i < overview.length;
    i++
  ) {
    if (
      overview[i] === " " &&
      overview[i - 1] !== "," &&
      overview[i - 1] !== "."
    ) {
      breakPoint = i;
      break;
    }
  }
  return overview.slice(0, breakPoint + 1);
}
