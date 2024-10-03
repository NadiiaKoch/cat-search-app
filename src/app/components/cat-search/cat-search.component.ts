import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSidenavModule } from '@angular/material/sidenav';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { map, Observable } from 'rxjs';
import { Breed } from '../../shared/interfaces/breed';
import { CatImage } from '../../shared/interfaces/cat-image';
import {
  AddToFavorites,
  LoadBreeds,
  LoadCats,
  RemoveFromFavorites,
} from '../../state/cat.state';
import { CatCardComponent } from '../cat-card/cat-card.component';
import { FilterComponent } from '../filter/filter.component';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-cat-search',
  standalone: true,
  imports: [
    CommonModule,
    MatSidenavModule,
    HeaderComponent,
    FilterComponent,
    CatCardComponent,
    MatProgressSpinnerModule,
  ],
  templateUrl: './cat-search.component.html',
  styleUrl: './cat-search.component.scss',
})
export class CatSearchComponent implements OnInit {
  public breeds$: Observable<Breed[]> = this.store.select(
    (state) => state.cat.breeds
  );
  public cats$: Observable<CatImage[]> = this.store.select(
    (state) => state.cat.cats
  );
  public favorites$: Observable<CatImage[]> = this.store.select(
    (state) => state.cat.favorites
  );
  public favoritesCount$: Observable<number> = this.store
    .select((state) => state.cat.favorites)
    .pipe(map((favorites) => favorites.length));
  public form!: FormGroup;
  public cols: number = 2;
  public loading: boolean = true;

  public constructor(
    private fb: FormBuilder,
    private store: Store,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  public ngOnInit(): void {
    this.form = this.fb.group({
      breed: [this.route.snapshot.queryParamMap.get('breed') || ''],
      limit: [this.route.snapshot.queryParamMap.get('limit') || 10],
    });

    this.store.dispatch(new LoadCats('', 10)).subscribe(() => {
      this.loading = false;
    });
    this.store.dispatch(new LoadBreeds());

    this.adjustGridCols();
  }

  @HostListener('window:resize', ['$event'])
  private onResize(event: any): void {
    this.adjustGridCols();
  }

  private adjustGridCols(): void {
    this.cols = window.innerWidth <= 600 ? 1 : 2;
  }

  public trackByCatId(index: number, cat: CatImage): string {
    return cat.id;
  }

  public toggleFavorite(cat: CatImage): void {
    this.isFavorite(cat)
      ? this.store.dispatch(new RemoveFromFavorites(cat.id))
      : this.store.dispatch(new AddToFavorites(cat));
  }

  public isFavorite(cat: CatImage): boolean {
    let favorites: CatImage[] = [];
    this.favorites$.subscribe((fav) => (favorites = fav || []));
    return favorites.some((fav) => fav.id === cat.id);
  }

  public onSearch(): void {
    this.loading = true;
    const { breed, limit } = this.form.value;
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { breed, limit },
      queryParamsHandling: 'merge',
    });
    this.store.dispatch(new LoadCats(breed, limit)).subscribe(() => {
      this.loading = false;
    });
  }
}
