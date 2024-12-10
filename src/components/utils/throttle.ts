export function throttle<T extends (...args: any[]) => void>(
  func: T,
  limit: number,
): T {
  let inThrottle: boolean;

  const fun = (...args: any[]) => {
    if (!inThrottle) {
      func.apply({}, args);
      inThrottle = true;

      setTimeout(() => {
        inThrottle = false;
      }, limit);
    }
  };

  return fun as T;
}
