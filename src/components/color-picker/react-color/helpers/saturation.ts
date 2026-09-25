// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

export function calculateChange(event, hsl, container: Element) {
  const { width: containerWidth, height: containerHeight } =
    container.getBoundingClientRect();
  const x =
    typeof event.pageX === 'number' ? event.pageX : event.touches[0].pageX;
  const y =
    typeof event.pageY === 'number' ? event.pageY : event.touches[0].pageY;
  let left = x - (container.getBoundingClientRect().left + window.pageXOffset);
  let top = y - (container.getBoundingClientRect().top + window.pageYOffset);

  if (left < 0) {
    left = 0;
  } else if (left > containerWidth) {
    left = containerWidth;
  }

  if (top < 0) {
    top = 0;
  } else if (top > containerHeight) {
    top = containerHeight;
  }

  const saturation = left / containerWidth;
  const bright = 1 - top / containerHeight;

  return {
    h: hsl.h,
    s: saturation,
    v: bright,
    a: hsl.a,
    source: 'hsv',
  };
}
