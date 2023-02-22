import { Component } from '@angular/core';
import { LoginService } from 'src/app/shared/login.service';

@Component({
  selector: 'app-form-container',
  templateUrl: './form-container.component.html',
  styleUrls: ['./form-container.component.css']
})
export class FormContainerComponent {
  hide = false;
  
  constructor(private loginServ: LoginService) {}

  ngOnInit() {
    this.loginServ.user.subscribe((user) => {
      this.hide = !!user;
    });
  }
}
