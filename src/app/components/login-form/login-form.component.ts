import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginService } from 'src/app/shared/login.service';
import { of, tap } from 'rxjs';
import { User } from 'src/app/shared/user.model';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
})
export class LoginFormComponent {
  @ViewChild('f', { static: false }) myForm: NgForm;
  loginMode = true;
  loading = false;
  error: string;

  constructor(private loginServ: LoginService) {}

  onSwitchMode() {
    this.loginMode = !this.loginMode;
  }

  onSubmit() {
    this.loading = true;
    this.error = null;

    if (this.loginMode) {
      this.loginServ
        .logIn(this.myForm.value.email, this.myForm.value.password)
        .subscribe({
          next: (user: User) => {
            this.loginServ.user.next(user);
            const expireDate = new Date(
              new Date().getTime() + +user.expiresIn * 1000
            );
            const loadedUser = { ...user, expDate: expireDate };
            localStorage.setItem('userData', JSON.stringify(loadedUser));
            console.log(loadedUser);
            this.loading = false;
            this.loginServ.autoLogout(+user.expiresIn * 1000);
          },
          error: (e) => {
            this.error = e.error.error.message;
            switch (this.error) {
              case 'INVALID_PASSWORD':
                this.error = 'Wrong password';
                break;
            }
            this.loading = false;
          },
        });
    } else if (!this.loginMode) {
      this.loginServ
        .signUp(this.myForm.value.email, this.myForm.value.password)
        .subscribe({
          next: (user: User) => {
            // this.success = true;
            this.loading = false;
            console.log(this.loginServ.user);

            const expireDate = new Date(
              new Date().getTime() + +user.expiresIn * 1000
            );
            const loadedUser = { ...user, expDate: expireDate };
            localStorage.setItem('userData', JSON.stringify(loadedUser));
            console.log(loadedUser);

            this.loginServ.user.next(user);
            console.log(user);
            console.log(this.loginServ.user.value);
            this.loginServ.autoLogout(+user.expiresIn * 1000);
          },
          error: (e) => {
            this.error = e.error.error.message;
            switch (this.error) {
              case 'EMAIL_EXISTS':
                this.error = 'This email already exist';
                break;
            }
            this.loading = false;
          },
        });
    }
  }
}
