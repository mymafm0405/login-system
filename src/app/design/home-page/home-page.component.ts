import { Component } from '@angular/core';
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

  constructor(private storageServ: StorageService) {}

  ngOnInit() {
    this.storageServ.getAllPosts().subscribe((posts) => {
      this.allPosts = posts;
      this.loading = false;
    });
  }
}
