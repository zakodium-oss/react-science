export function throttle<T extends (...arguments_: any[]) => void>(
  function_: T,
  limit: number,
): T {
  let isInThrottle: boolean;

  const fun = (...arguments_: any[]) => {
    if (isInThrottle) {
      return;
    }

    function_.apply({}, arguments_);
    isInThrottle = true;

    setTimeout(() => {
      isInThrottle = false;
    }, limit);
  };

  return fun as T;
}
