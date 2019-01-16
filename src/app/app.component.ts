import { Component } from '@angular/core';
import { AuthService } from './services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isOpen = false;

  constructor(public auth: AuthService) {
    auth.registerCallback();
    auth.scheduleRenewal();
  }

  toggleSidebar() {
    this.isOpen = !this.isOpen;
  }

  login() {
    this.auth.login();
  }

  logout() {
    this.auth.logout();
  }
}
