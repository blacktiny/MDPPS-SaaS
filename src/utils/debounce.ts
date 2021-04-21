type Func = (...args: any[]) => any;

export default function debounce<F extends Func>(fn: F, time: number) {
  let timeout: ReturnType<typeof setTimeout> | undefined;
  let lastArgs;

  return (...args: Parameters<F>) => {
    lastArgs = args;

    if (timeout) {
      clearTimeout(timeout);
    }

    timeout = setTimeout(() => fn(...lastArgs), time);
  };
}
