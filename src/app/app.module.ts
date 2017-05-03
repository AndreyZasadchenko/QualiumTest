import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthModule } from './auth/auth.module';
import { HttpModule } from '@angular/http';

import { AuthGuard } from './common/auth-guard/auth-guard.service';
import { AuthService } from './services/auth/auth.service';
import { TodoService } from './services/todo/todo.service';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';

import { routes } from './app.routes';

@NgModule({
  declarations: [
    AppComponent, HomeComponent, LoginComponent, SignupComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AuthModule,
    RouterModule.forRoot(routes, {useHash: true})
  ],
  providers: [AuthGuard, AuthService, TodoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
