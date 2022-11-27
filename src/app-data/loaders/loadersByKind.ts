/*
 * User may only want to analyze one type of data (e.g. only IR)
 */

import type { MeasurementKind } from '../state/index';

import { biologicLoader } from './biologicLoader';
import { cdfLoader } from './cdfLoader';
import { jcampLoader } from './jcampLoader';
import { cary500Loader } from './proprietary/agilent/cary500Loader';
import { spcLoader } from './spcLoader';
import { wdfLoader } from './wdfLoader';

import type { MeasurementsLoader } from './index';

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
