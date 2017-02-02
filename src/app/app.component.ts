import { Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthService } from './services/auth.service';
import { CapitalizePipe } from './custompipes/capitalize.pipe';

@Component({
  selector: 'kz-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'kz works!';

  constructor(private authService: AuthService){}

  isAuth() {
  	return this.authService.isAuth();
  }

  getName() {
   return this.authService.getUserName();
  }

  logout() {
  	this.authService.logout();
  }
}
