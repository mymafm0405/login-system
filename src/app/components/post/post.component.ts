import { Component, Input } from '@angular/core';
import { LoginService } from 'src/app/shared/login.service';
import { Post } from 'src/app/shared/post.model';
import { StorageService } from 'src/app/shared/storage.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
})
export class PostComponent {
  @Input() post: Post;

  owner = false;

  constructor(
    private loginServ: LoginService,
    private storageServ: StorageService
  ) {}

  ngOnInit() {
    if (this.loginServ.user.value) {
      this.owner = this.loginServ.user.value.localId === this.post.userId;
    }
  }

  onDelete() {
    console.log(this.post);

    this.storageServ.showModal.next({ show: true, post: this.post });
  }

  // onPostClick() {
  //   this.storageServ.currentPost.next(this.post);
  // }
}
