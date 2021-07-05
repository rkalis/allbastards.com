export const range = (count: number, start = 0) => [...Array(count).keys()].map((i) => i + start);

// Safari on iOS / macOS is the only browser (besides IE) that doesn't support 'DataView.prototype.setBigUint64'
// so this can be used as a quick check
export const isSafari = () => DataView.prototype.setBigUint64 === undefined;

export const filterObjectByKey = <T>(obj: T, filterFunction: (key: any) => boolean): T => (
  Object.fromEntries(Object.entries(obj).filter(([key]) => filterFunction(key))) as T
);
