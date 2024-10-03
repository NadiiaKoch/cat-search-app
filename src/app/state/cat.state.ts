import { Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';
import { tap } from 'rxjs/operators';
import { Breed } from '../shared/interfaces/breed';
import { CatImage } from '../shared/interfaces/cat-image';
import { CatService } from '../services/cat.service';

// Дії
export class LoadBreeds {
  static readonly type = '[Cat] Load Breeds';
}

export class LoadCats {
  static readonly type = '[Cat] Load Cats';
  constructor(public breedId: string, public limit: number) {}
}

export class AddToFavorites {
  static readonly type = '[Cat] Add to Favorites';
  constructor(public cat: CatImage) {}
}

export class RemoveFromFavorites {
  static readonly type = '[Cat] Remove from Favorites';
  constructor(public catId: string) {}
}

// Модель стану
interface CatStateModel {
  breeds: Breed[];
  cats: CatImage[];
  favorites: CatImage[]; // Додаємо масив для улюблених котів
}

@State<CatStateModel>({
  name: 'cat',
  defaults: {
    breeds: [],
    cats: [],
    favorites: [], // Ініціалізуємо порожнім масивом
  },
})
@Injectable()
export class CatState {
  constructor(private catService: CatService) {}

  @Action(LoadBreeds)
  loadBreeds(ctx: StateContext<CatStateModel>) {
    return this.catService
      .getBreeds()
      .pipe(tap((breeds: Breed[]) => ctx.patchState({ breeds })));
  }

  @Action(LoadCats)
  loadCats(ctx: StateContext<CatStateModel>, action: LoadCats) {
    return this.catService
      .getCatsByBreed(action.breedId, action.limit)
      .pipe(tap((cats: CatImage[]) => ctx.patchState({ cats })));
  }

  @Action(AddToFavorites)
  addToFavorites(ctx: StateContext<CatStateModel>, action: AddToFavorites) {
    const state = ctx.getState();
    const favorites = [...state.favorites];

    const existingIndex = favorites.findIndex(
      (fav) => fav.id === action.cat.id
    );
    if (existingIndex === -1) {
      favorites.push(action.cat);
      ctx.patchState({ favorites });
    }
  }

  @Action(RemoveFromFavorites)
  removeFromFavorites(
    ctx: StateContext<CatStateModel>,
    action: RemoveFromFavorites
  ) {
    const state = ctx.getState();
    ctx.patchState({
      favorites: state.favorites.filter((cat) => cat.id !== action.catId),
    });
  }
}
