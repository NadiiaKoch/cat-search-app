import { Routes } from '@angular/router';
import { CatSearchComponent } from './components/cat-search/cat-search.component';
import { FavoritesComponent } from './components/favorites/favorites.component';

export const routes: Routes = [
  { path: 'cats', component: CatSearchComponent },
  { path: 'favorites-cats', component: FavoritesComponent },
  { path: '', redirectTo: '/cats', pathMatch: 'full' },
  { path: '**', redirectTo: '/cats' },
];
