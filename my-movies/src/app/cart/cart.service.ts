import { Injectable } from '@angular/core';
import { CatalogService } from '../catalog/catalog.service';
import { CardModel } from '../catalog/card/card-model.interface';
import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';
import { BehaviorSubject, Subject, Subscription, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { User } from '../auth/user.model';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  movies: BehaviorSubject<CardModel[]> = new BehaviorSubject<CardModel[]>([]);
  currentUser: User | null = null;

  //moviesObservable: Subject<CardModel[]>;

  constructor(private http: HttpClient, private authService: AuthService) {
    //this.moviesObservable = new Subject<CardModel[]>();
    this.authService.user.subscribe((user) => {
      console.log('user changed');
      console.log(user);
      this.currentUser = user;
      this.fetchMoviesForCurrentUser();
    });
  }

  add(card: CardModel) {
    console.log('add');
    if (!this.currentUser) {
      return;
    }

    console.log(this.movies.value);
    if (this.movies.value.some((item) => item.id === card.id)) {
      return;
    }

    const moviesToUpload = [ ...this.movies.value, card ];

    this.http
      .put(
        `${environment.apiUrl}/users/${this.currentUser.id}/cart.json?key=${environment.apiKey}`,
        moviesToUpload
      )
      .subscribe({
        next: () => {
          this.fetchMoviesForCurrentUser();
        },
        error: (error) => {
          console.error('Error adding movie:', error);
        },
      });
  }

  remove(id: number) {
    if (!this.currentUser) {
      return;
    }

    const moviesToRemain = this.movies.value.filter((item) => item.id !== id);
    this.http
      .put(
        `${environment.apiUrl}/users/${this.currentUser.id}/cart.json?key=${environment.apiKey}`,
        moviesToRemain.length ? moviesToRemain : 'empty'
      )
      .subscribe({
        next: () => {
          this.fetchMoviesForCurrentUser();
        },
        error: (error) => {
          console.error('Error removing movie:', error);
        },
      });
  }

  get(): Observable<CardModel[]> {
    if (!this.currentUser) {
      return of([]);
    }

    return this.http
      .get(
        `${environment.apiUrl}/users/${this.currentUser.id}/cart.json?key=${environment.apiKey}`
      )
      .pipe<CardModel[]>(
        map((response) => {
          if (!response || response === 'empty') {
            return [];
          } else {
            return response as CardModel[];
          }
        })
      );
  }

  fetchMoviesForCurrentUser() {
    this.get().subscribe({
      next: (movies) => {
        this.movies.next(movies);
      },
      error: (error) => {
        console.error('Error fetching movies:', error);
      },
    });
  }

  // getArrOfMovies(): void {
  //   this.catalog.cache.pipe(
  //     map((movies: CardModel[]) =>
  //       movies.slice(0, 10).forEach((item) => this.movies.push(item))
  //     )
  //   );
  // }
}
