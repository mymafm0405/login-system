import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent {
  @ViewChild('f', {static: false}) myForm: NgForm;

  imageSrc = '';
  viewImage = false;

  onImgChange() {
    this.viewImage = true;
    this.imageSrc = this.myForm.value.img;
  }

  onSubmit() {
    console.log(this.myForm.value);
    
  }
}
