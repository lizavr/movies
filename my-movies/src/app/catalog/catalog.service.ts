import { Injectable } from '@angular/core';
import { CardModel } from './card/card-model.interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { delay, map, shareReplay } from 'rxjs/operators';
import { CardFilter } from '../core/types';

@Injectable({
  providedIn: 'root',
})
export class CatalogService {
  cache: Observable<CardModel[]>;

  constructor(private http: HttpClient) {
    this.cache = this.http
      .get<CardModel[]>(
        'https://movies-2a4fe-default-rtdb.europe-west1.firebasedatabase.app/movies/popular.json'
      )
      .pipe(shareReplay(1));
  }

  getAllCards(
    cardFilters: CardFilter[] | undefined = undefined
  ): Observable<CardModel[]> {
    return this.cache.pipe(
      map((movies: CardModel[]) =>
        cardFilters
          ? movies.filter((movie) =>
              cardFilters.every((cardFilter) => cardFilter(movie))
            )
          : movies
      )
    );
  }

  getCardById(id: string): Observable<CardModel | undefined> {
    return this.cache.pipe(
      map((movies: CardModel[]) =>
        movies.find((movie) => movie.id.toString() === id)
      )
    );
  }

  getPopularMovies(): Observable<CardModel[]> {
    return this.cache.pipe(map((movies: CardModel[]) => movies.slice(10, 20)));
  }

  getEarliestYear(): Observable<CardModel> {
    return this.cache.pipe(
      map((movies: CardModel[]) => {
        return movies
          .filter((item) => item.release_date)
          .sort(
            (itemA, itemB) =>
              +itemA.release_date.slice(0, 4) - +itemB.release_date.slice(0, 4)
          )[0];
      })
    );
  }
}
