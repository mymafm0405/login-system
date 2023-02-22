import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from './user.model';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  myApis = 'AIzaSyCZkrDrAYMUayzM4Bvifkh4VNnds94TqWc';
  user = new BehaviorSubject<User>(null);

  constructor(private http: HttpClient) {}

  signUp(email: string, password: string) {
    return this.http.post(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' +
        this.myApis,
      {
        email,
        password,
        returnSecureToken: true,
      }
    );
  }

  logIn(email: string, password: string) {
    return this.http.post(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' +
        this.myApis,
      {
        email,
        password,
        returnSecureToken: true,
      }
    );
  }
}
