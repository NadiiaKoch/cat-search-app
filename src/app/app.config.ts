import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { HttpClientModule } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { NgxsModule } from '@ngxs/store';
import { routes } from './app.routes';
import { CatState } from './state/cat.state';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    importProvidersFrom(HttpClientModule),
    importProvidersFrom(NgxsModule.forRoot([CatState])),
    importProvidersFrom(
      NgxsStoragePluginModule.forRoot({
        keys: ['cat.favorites'],
      })
    ),
  ],
};
