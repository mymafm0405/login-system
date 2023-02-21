import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginService } from 'src/app/shared/login.service';
import { of, tap } from 'rxjs';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
})
export class LoginFormComponent {
  @ViewChild('f', { static: false }) myForm: NgForm;
  loginMode = true;
  loading = false;
  success = false;
  error: string;

  constructor(private loginServ: LoginService) {}

  onSwitchMode() {
    this.loginMode = !this.loginMode;
  }

  onSubmit() {
    this.loading = true;

    if (this.loginMode) {
      //
    } else if (!this.loginMode) {
      this.loginServ
        .signUp(this.myForm.value.email, this.myForm.value.password)
        .pipe(
          tap((s) => {
            console.log(s);
            this.success = true;
            this.loading = false;
          })
        )
        .subscribe({
          error: (e) => {
            this.error = e.error.error.message;
            this.loading = false;
          },
        });
    }
  }
}
