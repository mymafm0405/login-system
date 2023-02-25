import { Component, ElementRef, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { tap } from 'rxjs/operators';
import { LoginService } from 'src/app/shared/login.service';
import { Post } from 'src/app/shared/post.model';
import { StorageService } from 'src/app/shared/storage.service';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css'],
})
export class AddPostComponent {
  @ViewChild('f', { static: false }) myForm: NgForm;
  @ViewChild('img', {static: false}) myImg: ElementRef;

  success = false;
  loading = false;
  error: string;

  constructor(private storageServ: StorageService, private loginServ: LoginService) {}

  imageSrc = '';
  viewImage = false;

  onImgChange() {
    this.viewImage = true;
    this.imageSrc = this.myForm.value.img;
    // console.log(this.myImg.nativeElement);
  }

  onError() {
    // here to display image as error if the url is not correct
    this.imageSrc = '../../../assets/error.avif'
  }

  onSubmit() {
    this.loading = true;

    const newPost = new Post(
      this.loginServ.user.value.localId,
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
