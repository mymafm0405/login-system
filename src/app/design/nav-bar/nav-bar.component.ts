import { Component } from '@angular/core';
import { LoginService } from 'src/app/shared/login.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
  loggedIn = false;

  constructor(private loginServ: LoginService) {}

  ngOnInit() {
    this.loginServ.user.subscribe(user => {
      this.loggedIn = !!user;
    })
  }
}
