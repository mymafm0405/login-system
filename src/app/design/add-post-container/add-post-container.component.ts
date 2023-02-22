import { Component } from '@angular/core';
import { LoginService } from 'src/app/shared/login.service';

@Component({
  selector: 'app-add-post-container',
  templateUrl: './add-post-container.component.html',
  styleUrls: ['./add-post-container.component.css']
})
export class AddPostContainerComponent {
  show = false;
  
  constructor(private loginServ: LoginService) {}

  ngOnInit() {
    this.loginServ.user.subscribe((user) => {
      this.show = !!user;
    });
  }
}
