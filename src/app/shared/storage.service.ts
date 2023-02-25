import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { LoginService } from './login.service';
import { Post } from './post.model';

@Injectable({ providedIn: 'root' })
export class StorageService {
  postsChanged = new Subject<boolean>();
  showModal = new Subject<{show: boolean, post: Post}>();

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
    return this.http
      .get('https://login-system-1ef04-default-rtdb.firebaseio.com/posts.json')
      .pipe(
        map((res) => {
          const posts: Post[] = [];
          for (const key in res) {
            if (res.hasOwnProperty(key)) {
              posts.push({ ...res[key], id: key });
            }
          }
          return posts;
        })
      );
  }

  deletePost(postId: string) {
    const idToken = this.loginServ.user.value.idToken;
    return this.http
      .delete(
        'https://login-system-1ef04-default-rtdb.firebaseio.com/posts/' +
          postId +
          '.json',
        {
          params: new HttpParams().set('auth', idToken),
        }
      )
      .pipe(
        tap(() => {
          this.postsChanged.next(true);
        })
      );
  }
}
