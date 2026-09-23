export function debounce<T extends (...arguments_: any[]) => any>(
  function_: T,
  wait: number,
): (...arguments_: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null;

  return (...arguments_: Parameters<T>) => {
    if (timeout) {
      clearTimeout(timeout);
    }

    timeout = setTimeout(() => {
      function_.apply({}, arguments_);
    }, wait);
  };
}
