import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import {provideAnimations} from '@angular/platform-browser/animations'
import { routes } from './app.routes';
import { HTTP_INTERCEPTORS, provideHttpClient, withFetch, withInterceptorsFromDi } from '@angular/common/http';
import { provideToastr} from 'ngx-toastr';
import { AuthInterceptor } from './_Interceptor/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes), 
    provideHttpClient(withInterceptorsFromDi(), withFetch()), //aprender sobre withInterceptorsFromDi
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    provideToastr(),
    provideAnimations(),
  ]
};
