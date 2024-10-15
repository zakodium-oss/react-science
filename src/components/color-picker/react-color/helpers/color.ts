// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import each from 'lodash/each.js';
import tinycolor from 'tinycolor2';

function simpleCheckForValidColor(data) {
  const keysToCheck = ['r', 'g', 'b', 'a', 'h', 's', 'l', 'v'];
  let checked = 0;
  let passed = 0;
  each(keysToCheck, (letter) => {
    if (data[letter]) {
      checked += 1;
      if (!Number.isNaN(Number(data[letter]))) {
        passed += 1;
      }
      if (letter === 's' || letter === 'l') {
        const percentPatt = /^\d+%$/;
        if (percentPatt.test(data[letter])) {
          passed += 1;
        }
      }
    }
  });
  return checked === passed ? data : false;
}

function toState(data, oldHue?: number) {
  const color = data.hex ? tinycolor(data.hex) : tinycolor(data);
  const hsl = color.toHsl();
  const hsv = color.toHsv();
  const rgb = color.toRgb();

  let hex;

  if (rgb.a < 1) {
    hex = color.toHex8();
  } else {
    hex = color.toHex();
  }

  if (hsl.s === 0) {
    hsl.h = oldHue || 0;
    hsv.h = oldHue || 0;
  }

  return {
    hsl,
    hex: `#${hex}`,
    rgb,
    hsv,
    oldHue: data.h || oldHue || hsl.h,
    source: data.source,
  };
}

function isValidHex(hex) {
  if (hex === 'transparent') {
    return true;
  }
  // disable hex4 and hex8
  const lh = String(hex).startsWith('#') ? 1 : 0;
  return (
    hex.length !== 4 + lh && hex.length < 7 + lh && tinycolor(hex).isValid()
  );
}

function getContrastingColor(data) {
  if (!data) {
    return '#fff';
  }
  const col = toState(data);
  if (col.hex === 'transparent') {
    return 'rgba(0,0,0,0.4)';
  }
  const yiq = (col.rgb.r * 299 + col.rgb.g * 587 + col.rgb.b * 114) / 1000;
  return yiq >= 128 ? '#000' : '#fff';
}

function isvalidColorString(string, type) {
  const stringWithoutDegree = string.replace('°', '');
  return tinycolor(`${type} (${stringWithoutDegree})`)._ok;
}

const red = {
  hsl: { a: 1, h: 0, l: 0.5, s: 1 },
  hex: '#ff0000',
  rgb: { r: 255, g: 0, b: 0, a: 1 },
  hsv: { h: 0, s: 1, v: 1, a: 1 },
};

export {
  red,
  isvalidColorString,
  getContrastingColor,
  isValidHex,
  simpleCheckForValidColor,
  toState,
};
