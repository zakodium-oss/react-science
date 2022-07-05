//@ts-nocheck

export function irSpectrumEnhancer(variables) {
  // we add missing absorbance / transmittance
  // variable a = absorbance
  // variable t = transmittance
  let yVariable = variables.y;
  let absorbance = true;
  if (yVariable.label.toLowerCase().includes('trans')) {
    absorbance = false;
  }

  if (absorbance) {
    variables.a = { ...yVariable };
    variables.a.data = variables.a.data.slice();
    variables.t = {
      data: yVariable.data.map((absorbance) => 10 ** -absorbance * 100),
      label: 'Transmittance (%)',
      units: '',
    };
  } else {
    const factor =
      yVariable.label.includes('%') ||
      yVariable.label.toLowerCase().includes('percent')
        ? 100
        : 1;
    variables.a = {
      data: yVariable.data.map(
        (transmittance) => -Math.log10(transmittance / factor),
      ),
      label: 'Absorbance',
      units: '',
    };
    if (factor === 100) {
      variables.t = { ...yVariable };
      variables.t.data = variables.t.data.slice();
    } else {
      variables.t = {
        units: '',
        label: 'Transmittance (%)',
        data: yVariable.data.map((transmittance) => transmittance * 100),
      };
    }
  }
}
