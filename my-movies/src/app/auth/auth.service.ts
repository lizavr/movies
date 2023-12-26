import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { throwError, BehaviorSubject, Observable } from 'rxjs';

import { User } from './user.model';

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
export class AuthService implements OnInit {
  storedDataJSON: string | undefined;
  user = new BehaviorSubject<User | null>(null);

  constructor(private http: HttpClient) {}
  ngOnInit(): void {
    let storedData;
    if (this.storedDataJSON !== null && this.storedDataJSON !== undefined) {
      storedData = JSON.parse(this.storedDataJSON);
    }

    if (storedData) {
      const loadedUser = new User(
        storedData.email,
        storedData.displayName,
        storedData.id,
        storedData._token,
        new Date(storedData._tokenExpirationDate)
      );

      if (loadedUser.token) {
        this.user.next(loadedUser);
      }
    }
  }

  signup(email: string, password: string, userName: string) {
    return this.http
      .post<AuthResponseData>(
        'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyA010gvs00_nYgB3h-g9M7lkyKLqMI7mHY',
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
        })
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

  login(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyA010gvs00_nYgB3h-g9M7lkyKLqMI7mHY',
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
        'https://www.googleapis.com/identitytoolkit/v3/relyingparty/setAccountInfo?key=AIzaSyA010gvs00_nYgB3h-g9M7lkyKLqMI7mHY',
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
}
