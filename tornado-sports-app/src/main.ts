// src/main.ts

import { enableProdMode, importProvidersFrom, provideZoneChangeDetection } from '@angular/core'; // <-- Import provideZoneChangeDetection
import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, withPreloading, PreloadAllModules } from '@angular/router';
import { provideRouter } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    // Add this line to enable click detection
    provideZoneChangeDetection({ eventCoalescing: true }), // <-- THE FIX

    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    importProvidersFrom(IonicModule.forRoot({})),
    provideRouter(routes, withPreloading(PreloadAllModules)),
  ],
});