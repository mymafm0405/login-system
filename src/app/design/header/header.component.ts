import { Component } from '@angular/core';
import { LoginService } from 'src/app/shared/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  loggedIn = false;

  constructor(private loginServ: LoginService) {}

  ngOnInit() {
    this.loginServ.user.subscribe((user) => {
      this.loggedIn = !!user;
    });
  }

  onLogout() {
    this.loginServ.logout();
  }
}
