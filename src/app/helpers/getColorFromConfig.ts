import { ColorConfig } from '../../app-data/index';

export function getColorFromConfig(config: ColorConfig) {
  if (config.kind === 'fixed') {
    return config.color;
  } else {
    throw new Error(`Unsupported color config: ${config.kind}`);
  }
}
