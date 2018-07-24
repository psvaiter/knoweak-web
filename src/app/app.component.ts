import { Component } from '@angular/core';
import { AuthService } from './services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'app';
  isOpen = false;

  constructor(private auth: AuthService) {
    auth.registerCallback();
  }

  toggleSidebar() {
    this.isOpen = !this.isOpen;
  }

  logout() {
    this.auth.login();
  }
}
