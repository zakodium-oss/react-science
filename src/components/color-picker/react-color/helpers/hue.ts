// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

export function calculateChange(event, direction, hsl, container: Element) {
  const containerWidth = container.clientWidth;
  const containerHeight = container.clientHeight;
  const x =
    typeof event.pageX === 'number' ? event.pageX : event.touches[0].pageX;
  const y =
    typeof event.pageY === 'number' ? event.pageY : event.touches[0].pageY;
  const left =
    x - (container.getBoundingClientRect().left + window.pageXOffset);
  const top = y - (container.getBoundingClientRect().top + window.pageYOffset);

  let h;
  if (direction === 'vertical') {
    if (top < 0) {
      h = 359;
    } else if (top > containerHeight) {
      h = 0;
    } else {
      const percent = -((top * 100) / containerHeight) + 100;
      h = (360 * percent) / 100;
    }
  } else {
    // eslint-disable-next-line no-lonely-if
    if (left < 0) {
      h = 0;
    } else if (left > containerWidth) {
      h = 359;
    } else {
      const percent = (left * 100) / containerWidth;
      h = (360 * percent) / 100;
    }
  }
  if (hsl.h !== h) {
    return {
      h,
      s: hsl.s,
      l: hsl.l,
      a: hsl.a,
      source: 'hsl',
    };
  }
  return null;
}
