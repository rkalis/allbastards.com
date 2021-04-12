export const range = (count: number, start = 0) =>
  [...Array(count).keys()].map(i => i + start);
