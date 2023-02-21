import { Component } from '@angular/core';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {
  loginMode = true;

  onSwitchMode() {
    this.loginMode = !this.loginMode
  }
}
