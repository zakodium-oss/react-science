/*
 * User may only want to analyze one type of data (e.g. only IR)
 */

import type { MeasurementKind } from '../../state/index';
import type { MeasurementsLoader } from '../index';
import {
  biologicLoader,
  jcampLoader,
  spcLoader,
  wdfLoader,
  cary500Loader,
  cdfLoader,
} from '../index';

export type KindToLoader = Record<MeasurementKind, MeasurementsLoader[]>;

// all kinds, using other as a fallback for unknown kinds, where it uses all parsers
export const selectLoaderByKind: KindToLoader = {
  ir: [spcLoader, jcampLoader],
  raman: [wdfLoader, jcampLoader],
  uvvis: [cary500Loader, spcLoader, jcampLoader],
  uv: [spcLoader, jcampLoader],
  iv: [biologicLoader],
  mass: [jcampLoader],
  nmr: [jcampLoader],
  gclc: [cdfLoader],
  gclcms: [cdfLoader],
  other: [
    spcLoader,
    jcampLoader,
    wdfLoader,
    biologicLoader,
    cary500Loader,
    cdfLoader,
  ],
};
