import { Component } from '@angular/core';
import { LoginService } from './shared/login.service';
import { User } from './shared/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(private loginServ: LoginService) {}

  ngOnInit() {
    const user: User = JSON.parse(localStorage.getItem('userData'));
    if (user) {
      console.log(user);
      this.loginServ.user.next(user);
    }
  }
}
