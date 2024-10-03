import { Component, OnInit } from '@angular/core';
import { CatImage } from '../../shared/interfaces/cat-image';
import { CatSearchComponent } from '../cat-search/cat-search.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';
import { CatCardComponent } from '../cat-card/cat-card.component';
import { HeaderComponent } from '../header/header.component';
import { RemoveFromFavorites } from '../../state/cat.state';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [CommonModule, CatCardComponent, HeaderComponent],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.scss',
})
export class FavoritesComponent {
  public favorites$: Observable<CatImage[]> = this.store.select(
    (state) => state.cat.favorites
  );

  public constructor(private store: Store) {}

  public trackByCatId(index: number, cat: CatImage): string {
    return cat.id;
  }

  public toggleFavorite(cat: CatImage): void {
    this.store.dispatch(new RemoveFromFavorites(cat.id));
  }
}
