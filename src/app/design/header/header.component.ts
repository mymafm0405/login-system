import { Component } from '@angular/core';
import { LoginService } from 'src/app/shared/login.service';
import { StorageService } from 'src/app/shared/storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  loggedIn = false;

  constructor(private loginServ: LoginService, private storageServ: StorageService) {}

  ngOnInit() {
    this.loginServ.user.subscribe((user) => {
      this.loggedIn = !!user;
    });
  }

  onLogout() {
    this.loginServ.logout();
    this.storageServ.postsChanged.next(true)
  }
}
