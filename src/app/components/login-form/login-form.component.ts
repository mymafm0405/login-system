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
            localStorage.setItem('userData', JSON.stringify(user))
            console.log(user);
            this.loading = false;
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
          next: (s: User) => {
            // this.success = true;
            this.loading = false;
            console.log(this.loginServ.user);
            this.loginServ.user.next(s);
            console.log(s);
            console.log(this.loginServ.user.value);
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
