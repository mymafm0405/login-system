import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { tap } from 'rxjs/operators';
import { Post } from 'src/app/shared/post.model';
import { StorageService } from 'src/app/shared/storage.service';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css'],
})
export class AddPostComponent {
  @ViewChild('f', { static: false }) myForm: NgForm;

  success = false;
  loading = false;
  error: string;

  constructor(private storageServ: StorageService) {}

  imageSrc = '';
  viewImage = false;

  onImgChange() {
    this.viewImage = true;
    this.imageSrc = this.myForm.value.img;
  }

  onSubmit() {
    this.loading = true;

    const newPost = new Post(
      this.myForm.value.title,
      this.myForm.value.desc,
      this.myForm.value.img
    );
    this.storageServ
      .addPost(newPost)
      .pipe(
        tap((res) => {
          this.loading = false;
          console.log(res);
        })
      )
      .subscribe({
        error: (e) => {
          this.loading = false;
          this.error = e.error.error;
          console.log(e);
        },
      });
  }
}
