import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(public router: Router, public http: Http, private auth: AuthService) {}

  error: String;

  login(event, email, password) {
    event.preventDefault();
    this.error = "";
    this.auth.login(email, password).subscribe(
      response => {
        this.auth.token = response.json().token;
        localStorage.setItem('user', response.json().user.id);
        localStorage.setItem('token', this.auth.token);
        localStorage.setItem('email', response.json().user.email);
        this.router.navigate(['']);
      },
      error => {
        if (error.status === 401) {
          this.error = "Invalid email/password or user does not exist";
          return;
        }
      },
      () => console.log('login#done')
    );
  }

  signup(event) {
    event.preventDefault();
    this.router.navigate(['signup']);
  }
}
