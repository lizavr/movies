import { Injectable } from '@angular/core';
import { CardModel } from '../catalog/card/card-model.interface';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';
import { BehaviorSubject, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { User } from '../auth/user.model';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class MyCollectionService {
  movies: BehaviorSubject<CardModel[]> = new BehaviorSubject<CardModel[]>([]);
  currentUser: User | null = null;

  constructor(private http: HttpClient, private authService: AuthService) {
    this.authService.user.subscribe((user) => {
      this.currentUser = user;
      this.fetchMoviesForCurrentUser();
    });
  }

  addMovies(cards: CardModel[]) {
    if (!this.currentUser) {
      return;
    }

    // if (this.movies.value.some((item) => item.id === card.id)) {
    //   return;
    // }

    const moviesToUpload = [ ...this.movies.value, ...cards ];

    this.http
      .put(
        `${environment.apiUrl}/users/${this.currentUser.id}/collection.json?key=${environment.apiKey}`,
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

  // remove(id: number) {
  //   if (!this.currentUser) {
  //     return;
  //   }

  //   const moviesToRemain = this.movies.value.filter((item) => item.id !== id);
  //   this.http
  //     .put(
  //       `${environment.apiUrl}/users/${this.currentUser.id}/cart.json?key=${environment.apiKey}`,
  //       moviesToRemain.length ? moviesToRemain : JSON.stringify('empty')
  //     )
  //     .subscribe({
  //       next: () => {
  //         this.fetchMoviesForCurrentUser();
  //       },
  //       error: (error) => {
  //         console.error('Error removing movie:', error);
  //       },
  //     });
  // }

  get(): Observable<CardModel[]> {
    if (!this.currentUser) {
      return of([]);
    }

    return this.http
      .get(
        `${environment.apiUrl}/users/${this.currentUser.id}/collection.json?key=${environment.apiKey}`
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
}
