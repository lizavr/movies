import { Injectable } from '@angular/core';
import { CatalogService } from '../catalog/catalog.service';
import { CardModel } from '../catalog/card/card-model.interface';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private catalog: CatalogService) {}
  arrOfMovies: Observable<CardModel[]> | undefined;

  getArrOfMovies(): Observable<CardModel[]> {
    return (this.arrOfMovies = this.catalog.cache.pipe(
      map((movies: CardModel[]) => movies.slice(0, 5))
    ));
  }
}
