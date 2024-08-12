import { Component } from '@angular/core';

@Component({
  selector: 'app-page-layout',
  templateUrl: './page-layout.component.html',
})

export class PageLayoutComponent {
  currentPath: string;

  constructor() {
    this.currentPath = window.location.pathname;
  }

  // path to title
  getTitle() {
    if (this.currentPath === '/add') {
      return 'Add';
    } else if (this.currentPath === '/edit') {
      return 'Edit';
    } else if (this.currentPath === '/register') {
      return 'Register';
    } else {
      return 'Page not found';
    }
  }

  
}
