import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { appConfig } from './app.config';
import { AuthService } from './services/auth.service';
const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(),
    AuthService
  ]
};
export const config = mergeApplicationConfig(appConfig, serverConfig);
