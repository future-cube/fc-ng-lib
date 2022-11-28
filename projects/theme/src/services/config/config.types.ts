import { InjectionToken } from '@angular/core';

import { FcStOptions } from '../st-helper/st-helper.service';

export interface FcConfig {
  st?: FcStOptions;
}

export type FcConfigKey = keyof FcConfig;

export const FC_CONFIG = new InjectionToken<FcConfig>('alain-config', {
  providedIn: 'root',
  factory: FC_CONFIG_FACTORY
});

export function FC_CONFIG_FACTORY(): FcConfig {
  return {};
}
