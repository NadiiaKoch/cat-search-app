import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'cats',
    loadComponent: () =>
      import('./components/cat-search/cat-search.component').then(
        (m) => m.CatSearchComponent
      ),
  },
  {
    path: 'favorites-cats',
    loadComponent: () =>
      import('./components/favorites/favorites.component').then(
        (m) => m.FavoritesComponent
      ),
  },
  { path: '', redirectTo: '/cats', pathMatch: 'full' },
  { path: '**', redirectTo: '/cats' },
];
