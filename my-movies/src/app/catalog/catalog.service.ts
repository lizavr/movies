import { Injectable } from '@angular/core';
import { CardModel } from './card/card-model.interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { delay, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CatalogService {
  constructor(private http: HttpClient) {}

  getAllCards(): Observable<CardModel[]> {
    return this.http
      .get<CardModel[]>(
        'https://movies-2a4fe-default-rtdb.europe-west1.firebasedatabase.app/movies/popular.json'
      )
      .pipe(delay(2000));
  }

  getCardById(id: string): Observable<CardModel | undefined> {
    return this.http
      .get<CardModel[]>(
        'https://movies-2a4fe-default-rtdb.europe-west1.firebasedatabase.app/movies/popular.json'
      )
      .pipe(
        map((movies: CardModel[]) =>
          movies.find((movie) => movie.id.toString() === id)
        ),
        delay(3000)
      );
  }

  getThreeMovies(): Observable<CardModel[]> {
    return this.getAllCards().pipe(
      map((movies: CardModel[]) => movies.splice(0, 5))
    );
  }
}
