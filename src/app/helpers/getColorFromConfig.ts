import { ColorConfig } from '../../app-data/index';

export function getColorFromConfig(config: ColorConfig) {
  if (config.kind === 'fixed') {
    return config.color;
  } else {
    return (point: { color?: string }) => point.color;
  }
}
