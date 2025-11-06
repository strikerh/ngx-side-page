import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideSidePageConfig } from 'ngx-side-page';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    // Test our newly exported configuration function
    provideSidePageConfig({
      width: '450px',
      maxWidth: '90vw',
      minWidth: '300px',
      position: 'end',
      disableClose: false
    })
  ]
};
