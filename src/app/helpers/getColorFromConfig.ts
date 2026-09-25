import type { ColorConfig } from '../../components/index.js';

export function getColorFromConfig(config: ColorConfig) {
  if (config.kind === 'fixed') {
    return config.color;
  }
  throw new Error(`Unsupported color config: ${config.kind}`);
}
