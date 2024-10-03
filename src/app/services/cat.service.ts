import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Breed } from '../shared/interfaces/breed';
import { CatImage } from '../shared/interfaces/cat-image';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CatService {
  private apiUrl = 'https://api.thecatapi.com/v1/';
  private apiKey = environment.apiKey;

  public constructor(private http: HttpClient) {}

  public getBreeds(): Observable<Breed[]> {
    return this.http.get<Breed[]>(`${this.apiUrl}breeds`, {
      headers: { 'x-api-key': this.apiKey },
    });
  }

  public getCatsByBreed(
    breedId: string,
    limit: number
  ): Observable<CatImage[]> {
    return this.http.get<CatImage[]>(`${this.apiUrl}images/search`, {
      headers: { 'x-api-key': this.apiKey },
      params: { breed_ids: breedId, limit: limit.toString(), has_breeds: 1 },
    });
  }
}
