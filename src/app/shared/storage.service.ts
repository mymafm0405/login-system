import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from './post.model';

@Injectable({ providedIn: 'root' })
export class StorageService {
  posts: Post[] = [];

  constructor(private http: HttpClient) {}

  addPost(newPost: Post) {
    return this.http.post(
      'https://login-system-1ef04-default-rtdb.firebaseio.com/posts.json',
      newPost
    );
  }

  getAllPosts() {
    this.http
      .get('https://login-system-1ef04-default-rtdb.firebaseio.com/post.json')
      .subscribe((data) => {
        console.log(data);
      });
  }
}
