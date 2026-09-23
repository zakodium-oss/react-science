// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

export function calculateChange(
  event,
  hsl,
  direction,
  initialA,
  container: Element,
) {
  const containerWidth = container.clientWidth;
  const containerHeight = container.clientHeight;
  const x =
    typeof event.pageX === 'number' ? event.pageX : event.touches[0].pageX;
  const y =
    typeof event.pageY === 'number' ? event.pageY : event.touches[0].pageY;
  const left =
    x - (container.getBoundingClientRect().left + window.pageXOffset);
  const top = y - (container.getBoundingClientRect().top + window.pageYOffset);

  let a;
  if (direction === 'vertical') {
    if (top < 0) {
      a = 0;
    } else if (top > containerHeight) {
      a = 1;
    } else {
      a = Math.round((top * 100) / containerHeight) / 100;
    }

    if (hsl.a !== a) {
      return {
        h: hsl.h,
        s: hsl.s,
        l: hsl.l,
        a,
        source: 'rgb',
      };
    }
  } else {
    if (left < 0) {
      a = 0;
    } else if (left > containerWidth) {
      a = 1;
    } else {
      a = Math.round((left * 100) / containerWidth) / 100;
    }

    if (initialA !== a) {
      return {
        h: hsl.h,
        s: hsl.s,
        l: hsl.l,
        a,
        source: 'rgb',
      };
    }
  }
  return null;
}
