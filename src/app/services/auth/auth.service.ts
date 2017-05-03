import { Injectable } from '@angular/core';
import { tokenNotExpired } from 'angular2-jwt';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { contentHeaders } from '../../common/headers/headers';

@Injectable()
export class AuthService {
  constructor(private _http: Http, private router: Router) {}

  token = localStorage.getItem('token');

  login(email, password) {
    let body = JSON.stringify({ email, password });
    contentHeaders.set('Authorization', `Basic ${btoa(email + ':' + password)}`);
    return this._http.post('http://localhost:9000/auth', body, {headers: contentHeaders});
  }

  logout() {
    if (this.token) {
      this.token = "";
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('email');
      this.router.navigate(['login']);
    }
  }

  loggedIn() {
    return tokenNotExpired();
  }
}
