import { InjectionToken } from '@angular/core';

export interface AppConfig {
  authority: string;
  clientId: string;
  audience: string;
  apiUrl: string;
}

export const APP_CONFIG = new InjectionToken<AppConfig>('APP_CONFIG');
