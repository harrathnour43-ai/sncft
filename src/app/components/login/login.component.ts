import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginData = {
    email: '',
    password: '',
    remember: false
  };

  onLogin(): void {
    console.log('Login attempt:', this.loginData);
    // Add your login logic here
  }
}
