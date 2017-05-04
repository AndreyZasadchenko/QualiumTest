import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { contentHeaders } from '../../common/headers/headers';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  constructor(public router: Router, public http: Http, private auth: AuthService) {}

  error: String;

  signup(event, email, password) {
    event.preventDefault();
    this.error = "";
    let body = JSON.stringify({ email, password });
    this.http.post('http://localhost:9000/users', body, { headers: contentHeaders })
      .subscribe(
        response => {
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
                this.error = "Invalid email/password or unauthorized";
                return;
              }
            },
            () => console.log('login#done')
          );
        },
        error => {
          alert(error.text());
          console.log(error.text());
        }
      );
  }

  login(event) {
    event.preventDefault();
    this.router.navigate(['login']);
  }
}
