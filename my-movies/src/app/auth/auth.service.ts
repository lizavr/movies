import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
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

export interface RefreshResponseData {
  access_token: string;
  refresh_token: string;
  id_token: string;
  user_id: string;
  expires_in: string;
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
    if (storedData) {
      let currentUser = new User(
        storedData.email,
        storedData.displayName,
        storedData.id,
        storedData.refreshToken,
        storedData._token,
        new Date(storedData._tokenExpirationDate)
      );

      if (currentUser.token) {
        this.user.next(currentUser);
      } else if (currentUser.refreshToken) {
        this.refreshToken(currentUser.refreshToken).subscribe({
          next: (resData) => {
            this.handleAuthentication(
              currentUser.email,
              currentUser.displayName,
              currentUser.id,
              resData.refresh_token,
              resData.id_token,
              +resData.expires_in
            );
          },
          error: () => {
            console.log('Refresh token error');
          },
        });
      }
    }
  }

  isAdmin(): boolean {
    return (
      this.user.value !== null &&
      this.user.value?.id === 'JL3fnfNPYjXj46tCCFBIdmLboWq2'
    );
  }

  refreshToken(refreshToken: string): Observable<RefreshResponseData> {
    return this.http
      .post<RefreshResponseData>(
        `${environment.tokenUrl}?key=${environment.apiKey}`,
        {
          grant_type: 'refresh_token',
          refresh_token: refreshToken,
          returnSecureToken: true,
        }
      )
      .pipe(catchError(this.handleError));
  }

  signup(email: string, password: string, userName: string) {
    return this.http
      .post<AuthResponseData>(
        `${environment.authApiUrl}/relyingparty/signupNewUser?key=${environment.apiKey}`,
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
            resData.refreshToken,
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
        `${environment.authApiUrl}/relyingparty/verifyPassword?key=${environment.apiKey}`,
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
            resData.refreshToken,
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
        `${environment.authApiUrl}/relyingparty/setAccountInfo?key=${environment.apiKey}`,
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
    refreshToken: string,
    token: string,
    expiresIn: number
  ) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(
      email,
      displayName,
      userId,
      refreshToken,
      token,
      expirationDate
    );
    this.user.next(user);

    const userData = {
      email: email,
      displayName: displayName,
      refreshToken: refreshToken,
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
