import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { throwError, BehaviorSubject, Observable, forkJoin } from 'rxjs';
import { User } from './user.model';
import { environment } from '../../environments/environment';

export interface AuthResponseData {
  kind: string;
  idToken: string;
  displayName: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  user = new BehaviorSubject<User | null>(null);

  constructor(private http: HttpClient) {
    let storedData;
    let storedDataJson = localStorage.getItem('userData');
    if (storedDataJson !== null && storedDataJson !== undefined) {
      storedData = JSON.parse(storedDataJson);
    }
    let currentUser;
    if (storedData) {
      currentUser = new User(
        storedData.email,
        storedData.displayName,
        storedData.id,
        storedData._token,
        new Date(storedData._tokenExpirationDate)
      );

      if (currentUser.token) {
        this.user.next(currentUser);
      }
    }
  }

  signup(email: string, password: string, userName: string) {
    return this.http
      .post<AuthResponseData>(
        `${environment.authApiUrl}/signupNewUser?key=${environment.apiKey}`,
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        switchMap((response) => {
          return this.updateUserName(response, userName);
        }),
        catchError((error) => {
          return throwError(() => new Error(error));
        }),
        switchMap((resData) => {
          return forkJoin({
            cart: this.createEmptyCart(resData),
            collection: this.createEmptyCollection(resData),
          }).pipe(map(() => resData));
        }),
        tap((resData) => {
          this.handleAuthentication(
            resData.email,
            resData.displayName,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          );
        }),
        catchError(this.handleError)
      );
  }

  login(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        `${environment.authApiUrl}/verifyPassword?key=${environment.apiKey}`,
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError(this.handleError),
        tap((resData) => {
          this.handleAuthentication(
            resData.email,
            resData.displayName,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          );
        })
      );
  }

  updateUserName(
    responseData: AuthResponseData,
    userName: string
  ): Observable<AuthResponseData> {
    return this.http
      .post<AuthResponseData>(
        `${environment.authApiUrl}/setAccountInfo?key=${environment.apiKey}`,
        {
          idToken: responseData.idToken,
          displayName: userName,
          returnSecureToken: true,
        }
      )
      .pipe(
        map((nameUpdateResponse) => {
          responseData.displayName = nameUpdateResponse.displayName;
          return responseData;
        })
      );
  }

  private handleAuthentication(
    email: string,
    displayName: string,
    userId: string,
    token: string,
    expiresIn: number
  ) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, displayName, userId, token, expirationDate);
    this.user.next(user);

    const userData = {
      email: email,
      displayName: displayName,
      id: userId,
      _token: token,
      _tokenExpirationDate: expirationDate.toISOString(),
    };
    localStorage.setItem('userData', JSON.stringify(userData));
  }

  logout() {
    this.user.next(null);
    localStorage.removeItem('userData');
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(() => new Error(errorMessage));
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email exists already';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'This email does not exist.';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'This password is not correct.';
        break;
    }
    return throwError(() => new Error(errorMessage));
  }

  createEmptyCart(authResponseData: AuthResponseData): Observable<any> {
    return this.http.put(
      `${environment.apiUrl}/users/${authResponseData.localId}/cart.json?key=${environment.apiKey}`,
      JSON.stringify('empty')
    );
  }

  createEmptyCollection(authResponseData: AuthResponseData) {
    return this.http.put(
      `${environment.apiUrl}/users/${authResponseData.localId}/collection.json?key=${environment.apiKey}`,
      JSON.stringify('empty')
    );
  }
}
