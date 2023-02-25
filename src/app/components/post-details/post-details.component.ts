import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Post } from 'src/app/shared/post.model';
import { StorageService } from 'src/app/shared/storage.service';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.css'],
})
export class PostDetailsComponent {
  postId: string;
  post: Post;
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private storageServ: StorageService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.postId = params['id'];
      this.findMyPost()
    });
  }

  findMyPost() {
    this.storageServ.getAllPosts().subscribe((posts) => {
      this.post = posts.find((post) => post.id === this.postId);
      this.loading = false;
    });
  }
}
