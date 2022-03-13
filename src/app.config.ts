import { InjectionToken } from '@angular/core';

export interface AppConfig {
  authority: string;
  clientId: string;
  audience: string;
}

export const APP_CONFIG = new InjectionToken<AppConfig>('APP_CONFIG');
