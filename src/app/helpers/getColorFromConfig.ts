import { ColorConfig } from '../../app-data/index';
// import { fixedGradientScales } from '../../components/index';

export function getColorFromConfig(config: ColorConfig) {
  if (config.kind === 'fixed') {
    return config.color;
  } else {
    throw new Error(`Unsupported color config: ${config.kind}`);
    // const scale = fixedGradientScales[config.gradient];
  }
}
