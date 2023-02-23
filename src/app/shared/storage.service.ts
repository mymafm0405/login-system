import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { LoginService } from './login.service';
import { Post } from './post.model';

@Injectable({ providedIn: 'root' })
export class StorageService {
  posts: Post[] = [];

  constructor(private http: HttpClient, private loginServ: LoginService) {}

  addPost(newPost: Post) {
    const idToken = this.loginServ.user.value.idToken;
    return this.http.post(
      'https://login-system-1ef04-default-rtdb.firebaseio.com/posts.json',
      newPost,
      {
        params: new HttpParams().set('auth', idToken),
      }
    );
  }

  getAllPosts() {
    const idToken = this.loginServ.user.value.idToken;
    return this.http
      .get(
        'https://login-system-1ef04-default-rtdb.firebaseio.com/posts.json',
        {
          params: new HttpParams().set('auth', idToken),
        }
      )
      .pipe(
        map((res) => {
          for (const key in res) {
            if (res.hasOwnProperty(key)) {
              this.posts.push({ ...res[key], id: key });
            }
          }
          return this.posts;
        })
      );
  }
}
