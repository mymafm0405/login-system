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
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (userData) {
      console.log(userData);
      
      const currentUser = new User(
        userData.idToken,
        userData.email,
        userData.refreshToken,
        userData.expiresIn,
        userData.localId
      );
      if (new Date(userData.expDate).getTime() < new Date().getTime()) {
        console.log('user expired');

        console.log(userData.expDate);
        console.log(new Date());
        this.loginServ.logout();
        return;
      }
      console.log(userData.expDate);
      console.log(new Date());

      console.log(currentUser);
      this.loginServ.user.next(currentUser);
    }
  }
}
