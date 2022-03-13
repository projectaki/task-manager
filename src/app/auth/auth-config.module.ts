import { NgModule } from '@angular/core';
import {
  AuthModule,
  LogLevel,
  OpenIdConfiguration,
  StsConfigHttpLoader,
  StsConfigLoader,
  StsConfigStaticLoader,
} from 'angular-auth-oidc-client';
import { AppConfig, APP_CONFIG } from 'src/app.config';

const authFactory = (config: AppConfig) => {
  const authConfig: OpenIdConfiguration = {
    authority: config.authority,
    redirectUrl: window.location.origin,
    postLogoutRedirectUri: window.location.origin,
    clientId: config.clientId,
    scope: `openid offline_access email profile ${config.audience}`,
    responseType: 'code',
    silentRenew: true,
    useRefreshToken: true,
    customParamsAuthRequest: {
      audience: config.audience,
    },
    customParamsRefreshTokenRequest: {
      scope: `openid offline_access email ${config.audience}`,
    },
    logLevel: LogLevel.None,
  };

  return new StsConfigStaticLoader(authConfig);
};

@NgModule({
  imports: [
    AuthModule.forRoot({
      loader: {
        provide: StsConfigLoader,
        useFactory: authFactory,
        deps: [APP_CONFIG],
      },
    }),
  ],
  exports: [AuthModule],
})
export class AuthConfigModule {}
