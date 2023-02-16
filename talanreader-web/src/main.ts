// Import required modules and environment configurations
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

// Enable production mode when in production environment
if (environment.production) {
  enableProdMode();
}
// Bootstrap the Angular application by creating a new platform and running the AppModule
platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch(err => console.error(err));
