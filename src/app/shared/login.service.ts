import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { StorageService } from './storage.service';
import { User } from './user.model';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  myApis = 'AIzaSyCZkrDrAYMUayzM4Bvifkh4VNnds94TqWc';
  user = new BehaviorSubject<User>(null);
  logoutTimer: any;

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

  logout() {
    this.user.next(null);
    localStorage.removeItem('userData')
    if (this.logoutTimer) {
      clearTimeout(this.logoutTimer);
    }
    this.logoutTimer = null;
  }

  autoLogout(expireTime: number) {
    this.logoutTimer = setTimeout(() => {
      this.logout()
    }, expireTime)
  }
}
