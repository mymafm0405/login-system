import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { Post } from 'src/app/shared/post.model';
import { StorageService } from 'src/app/shared/storage.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent {
  allPosts: Post[] = [];
  loading = true;
  mySub: Subscription;

  constructor(private storageServ: StorageService) {}

  ngOnInit() {
    this.getPosts();

    // Here we sub in case we delete or changes somthing during in the same page.
    this.mySub = this.storageServ.postsChanged.subscribe((status) => {
      if (status) {
        this.getPosts();
      }
    });
  }

  getPosts() {
    this.storageServ.getAllPosts().subscribe((posts) => {
      this.allPosts = posts;
      this.loading = false;
    });
  }

  ngOnDestroy() {
    this.mySub.unsubscribe();
  }
}
