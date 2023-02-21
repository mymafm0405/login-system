import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from './user.model';

// AIzaSyCZkrDrAYMUayzM4Bvifkh4VNnds94TqWc

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  user = new BehaviorSubject<User>(null);

  constructor(private http: HttpClient) {}

  signUp(email: string, password: string) {
    return this.http.post(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCZkrDrAYMUayzM4Bvifkh4VNnds94TqWc',
      {
        email,
        password,
        returnSecureToken: true,
      }
    );
  }
}
