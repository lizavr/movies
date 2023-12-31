import { Injectable, Output } from '@angular/core';
import { CardModel } from './card/card-model.interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { map, shareReplay } from 'rxjs/operators';
import { CardFilter } from '../core/types';
import { environment } from '../../environments/environment';
import { BehaviorSubject } from 'rxjs';
// import { ObservableInput } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CatalogService {
  cache: Observable<CardModel[]>;
  movieUpdated = new BehaviorSubject<CardModel | null>(null);

  constructor(private http: HttpClient) {
    // this.forChangeBD().subscribe();
    this.cache = this.http
      .get<CardModel[]>(
        `${environment.apiUrl}/movies/popular.json`
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

  update(id: number, title: string, description: string, language: string, release: string) {
    this.cache.subscribe({
      next: (movies) => {
        var modifiedMovie = movies.find((item) => item.id === id) ?? null;
        if (modifiedMovie) {
          modifiedMovie.title = title;
          modifiedMovie.overview = description;
          modifiedMovie.original_language = language;
          modifiedMovie.release_date = release;
          this.http.put(
            'https://movies-2a4fe-default-rtdb.europe-west1.firebasedatabase.app/movies/popular.json?key=AIzaSyA010gvs00_nYgB3h-g9M7lkyKLqMI7mHY',
            movies
          ).subscribe({
            next: () => {
              this.cache = this.http
                .get<CardModel[]>(
                  `${environment.apiUrl}/movies/popular.json`
                )
              .pipe(shareReplay(1));
              this.movieUpdated.next(modifiedMovie);

            },
            error: (err) => {
              console.error('Failed to update movie', err);
            }
          });;
        }
      },
    })
  }

  // functionForSendRequestsAndChangeBD(): number {
  //   return parseFloat((Math.random() * (10 - 1) + 1).toFixed(2));
  // }

  // forChangeBD() {
  //   console.log('1');
  //   return this.http
  //     .get<CardModel[]>(
  //       'https://movies-2a4fe-default-rtdb.europe-west1.firebasedatabase.app/movies/popular.json'
  //     )
  //     .pipe(
  //       map((cards) => {
  //         console.log('g');
  //         return cards.map((card) => ({
  //           ...card,
  //           price: this.functionForSendRequestsAndChangeBD(),
  //         }));
  //       }),
  //       switchMap((modifiedCards: CardModel[]): ObservableInput<any> => {
  //         console.log('g');
  //         console.log(modifiedCards);
  //         return this.http.put(
  //           'https://movies-2a4fe-default-rtdb.europe-west1.firebasedatabase.app/movies/popular.json?key=AIzaSyA010gvs00_nYgB3h-g9M7lkyKLqMI7mHY',
  //           modifiedCards
  //         );
  //       })
  //     );
  // }
}
