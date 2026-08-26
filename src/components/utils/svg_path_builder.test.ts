import { expect, it } from 'vitest';

import { SVGPathBuilder } from './svg_path_builder.ts';

it('should construct with default args', () => {
  const builder = new SVGPathBuilder();

  expect(builder.clampValue).toBe(1e5);
  expect(builder.getBufferSlice()).toHaveLength(0);
  expect(builder.toString()).toStrictEqual('');
});

it('should not be able to edit buffer outside the class', () => {
  const builder = new SVGPathBuilder();

  const buffer = builder.getBufferSlice();
  buffer.push('foo');

  builder.moveTo(10, 10);

  expect(builder.getBufferSlice()).not.toStrictEqual(buffer);
  expect(builder.getBufferSlice()).toStrictEqual(['M 10 10']);
  expect(buffer).toStrictEqual(['foo']);

  expect(builder.toString()).toStrictEqual('M 10 10');
});

it('should supports concat', () => {
  const b1 = new SVGPathBuilder(1e4);
  b1.moveTo(10, 10);
  b1.lineTo(20, 20);

  const b2 = new SVGPathBuilder(1e6);
  b1.lineTo(30, 20);

  const chain = SVGPathBuilder.concat(b1, b2);
  expect(b1.clampValue).toBe(1e4);
  expect(b2.clampValue).toBe(1e6);
  expect(chain.clampValue).toBe(1e5);
  expect(chain.getBufferSlice()).toStrictEqual([
    'M 10 10',
    'L 20 20',
    'L 30 20',
  ]);
  expect(chain.toString(' ')).toStrictEqual('M 10 10 L 20 20 L 30 20');
});

const CLAMPED_PATH_EXPECTED = `
M 25 25
  L 50 50
  L 50 0
  L 50 -50
  M -50 -50
  Z
`.trim();
it('should clamp values', () => {
  const builder = new SVGPathBuilder(50);

  builder
    .moveTo(25, 25)
    .lineTo(50, 50)
    .lineTo(100, 0)
    .lineTo(50, -100)
    .moveTo(-100, -100)
    .closePath();

  expect(builder.getBufferSlice()).toStrictEqual([
    'M 25 25',
    'L 50 50',
    'L 50 0',
    'L 50 -50',
    'M -50 -50',
    'Z',
  ]);

  expect(builder.toString()).toBe(CLAMPED_PATH_EXPECTED);
});

const NOT_CLAMPED_PATH_EXPECTED = `
M 25 25
  L 50 50
  L 100 0
  L 50 -100
  M -100 -100
  Z
`.trim();
it('should not clamp values', () => {
  const builder = new SVGPathBuilder(null);

  builder
    .moveTo(25, 25)
    .lineTo(50, 50)
    .lineTo(100, 0)
    .lineTo(50, -100)
    .moveTo(-100, -100)
    .closePath();

  expect(builder.getBufferSlice()).toStrictEqual([
    'M 25 25',
    'L 50 50',
    'L 100 0',
    'L 50 -100',
    'M -100 -100',
    'Z',
  ]);

  expect(builder.toString()).toBe(NOT_CLAMPED_PATH_EXPECTED);
});
