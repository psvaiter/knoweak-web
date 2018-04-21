import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'app';
  isOpen = false;

  toggleSidebar() {
    this.isOpen = !this.isOpen;
  }
}
