import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideQuillConfig } from 'ngx-quill'
import { routes } from './app.routes';
import Counter from './quill';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideQuillConfig({
    customModules: [{
      implementation: Counter,
      path: 'modules/counter'
    }],
    customOptions: [{
      import: 'formats/font',
      whitelist: ['mirza', 'roboto', 'aref', 'serif', 'sansserif', 'monospace']
    }]
  })]
};
