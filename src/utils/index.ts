import { ToastContent, ToastOptions, toast as doToast } from 'react-toastify';
import { overrideTailwindClasses } from 'tailwind-override';

export const range = (count: number, start = 0) => [...Array(count).keys()].map((i) => i + start);

// Safari on iOS / macOS is the only browser (besides IE) that doesn't support 'DataView.prototype.setBigUint64'
// so this can be used as a quick check
export const isSafari = () => DataView.prototype.setBigUint64 === undefined;

export const filterObjectByKey = <T>(obj: T, filterFunction: (key: any) => boolean): T => (
  Object.fromEntries(Object.entries(obj).filter(([key]) => filterFunction(key))) as T
);

export const toast = (content: ToastContent, options?: ToastOptions) => {
  const defaultOptions = {
    className: 'border-2 border-black text-black font-bold font-charriot rounded-none bg-white text-center',
  };

  const className = overrideTailwindClasses(`${defaultOptions.className} ${options?.className ?? ''}`);
  const combinedOptions = { ...defaultOptions, ...options, className };

  doToast(content, combinedOptions);
};
