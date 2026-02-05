import { ApplicationConfig, importProvidersFrom, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(),
    importProvidersFrom(ToastrModule.forRoot({
      toastClass: 'ngx-toastr toast fixed top-5 right-5 p-4 bg-white shadow-lg rounded-lg z-[9999]',
      positionClass: 'toast-top-right',
      closeButton: false,
      preventDuplicates: true,
      timeOut: 3000,
    }))
  ]
};
