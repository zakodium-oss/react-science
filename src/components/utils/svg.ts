import { assert } from './assert.ts';

export interface ExportSVGOptions {
  /**
   * CSS Selector to remove from the SVG.
   *
   * @example '[data-no-export="true"]' And add `data-no-export="true"` attribute to the elements you don't want in the exported SVG.
   * @default undefined (Will not remove any elements)
   */
  removeFromSelector?: string;

  /**
   * Add a background to the SVG. It can be useful to integrate exported svg in diapositive documents.
   *
   * @default false
   */
  addBackground?: boolean;

  /**
   * Background color of the SVG. You can use any valid CSS color.
   *
   * @default 'white' (It needs `addBackground: true` to work)
   */
  backgroundColor?: string;

  /**
   * Custom mutations to apply to the SVG.
   */
  customMutations?: (svg: SVGSVGElement) => void;
}

/**
 * Export an SVG element to a string.
 *
 * @param base
 * @param options
 *
 * @return The outerHTML of the SVG element.
 */
export function exportSVG(
  base: SVGSVGElement,
  options: ExportSVGOptions = {},
): string {
  const {
    removeFromSelector,
    addBackground = false,
    backgroundColor = 'white',
    customMutations,
  } = options;

  const svg = base.cloneNode(true) as SVGSVGElement;

  // cleanup svg
  if (removeFromSelector) {
    const items = svg.querySelectorAll(removeFromSelector);
    for (const item of items) {
      item.remove();
    }
  }

  if (addBackground) {
    const background = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'rect',
    );
    background.setAttribute('x', '0');
    background.setAttribute('y', '0');
    background.setAttribute('width', '100%');
    background.setAttribute('height', '100%');
    background.setAttribute('fill', backgroundColor);
    svg.prepend(background);
  }

  customMutations?.(svg);

  return svg.outerHTML;
}

/**
 * Export an SVG element to a PNG blob.
 *
 * @param base
 * @param options
 */
export async function exportSVGAsPNG(
  base: SVGSVGElement,
  options: ExportSVGOptions = {},
): Promise<Blob> {
  const {
    removeFromSelector,
    addBackground = false,
    backgroundColor = 'white',
    customMutations,
  } = options;

  const svg = exportSVG(base, {
    removeFromSelector,
    addBackground: false,
    customMutations,
  });
  const svgBlob = new Blob([svg], { type: 'image/svg+xml' });

  const img = new Image();
  img.src = URL.createObjectURL(svgBlob);
  await img.decode().finally(() => URL.revokeObjectURL(img.src));

  const canvas = new OffscreenCanvas(img.naturalWidth, img.naturalHeight);
  const ctx = canvas.getContext('2d');
  assert(ctx);

  if (addBackground) {
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  ctx.drawImage(img, 0, 0);

  const png = await canvas.convertToBlob({ type: 'image/png' });
  return png;
}
