import { Injectable } from '@angular/core';
import { CatalogService } from '../catalog/catalog.service';
import { CardModel } from '../catalog/card/card-model.interface';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  movies: CardModel[] = [];

  //moviesObservable: Subject<CardModel[]>;

  constructor(private catalog: CatalogService) {
    //this.moviesObservable = new Subject<CardModel[]>();
  }

add(card : CardModel) {
  if (this.movies.some((item) => item.id === card.id)) {
    return;
  }
  this.movies.push(card);
  //return this.moviesObservable.next(this.movies);
}

remove(id : number) {
  this.movies = this.movies.filter((item) => item.id !== id);
  //return this.moviesObservable.next(this.movies);
}

  get() {
    return this.movies;
  }

  // getArrOfMovies(): void {
  //   this.catalog.cache.pipe(
  //     map((movies: CardModel[]) =>
  //       movies.slice(0, 10).forEach((item) => this.movies.push(item))
  //     )
  //   );
  // }
}
