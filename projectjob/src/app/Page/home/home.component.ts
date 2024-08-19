import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../Service/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {

  publishedItems: any[] = [];
  filteredItems: any[] = [];

  message: string = '';

  constructor(private authService: AuthService, private router: Router,private http: HttpClient) { }

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.message = 'Already logged in';
    }
    this.message = 'Login to see token';
    this.loadPublishedItems();

  }

  filterItemsByType(header: string): any[] {
    return this.publishedItems.filter(item => {
      switch (header) {
        case 'ชุมชน':
          return item.communityName !== undefined;
        case 'แหล่งท่องเที่ยว':
          return item.placeName !== undefined;
        case 'อาหารและผลิตภัณฑ์':
          return item.fpName !== undefined;
        case 'แผนการท่องเที่ยว':
          return item.planName !== undefined;
        case 'กิจกรรม':
          return item.eventName !== undefined;
        case 'ข่าวประชาสัมพันธ์':
          return item.newsName !== undefined;
        default:
          return false;
      }
    });
  }


  getHeaderName(header: string, item: any): any {
    switch (header) {
      case 'ชุมชน':
        return item.communityName;
      case 'แหล่งท่องเที่ยว':

        return item.placeName;
      case 'อาหารและผลิตภัณฑ์':

        return item.fpName;
      case 'แผนการท่องเที่ยว':

        return item.planName;
      case 'กิจกรรมสรรทนาการ':

        return item.eventName;
      case 'ข่าวประชาสัมพันธ์':

        return item.newsName;
      default:
        return '';
    }
    
  }

  trackById(index: number, item: any): number {
    return item.communityId;
  }

  loadPublishedItems() {
    this.publishedItems = this.getPublishedItems();
  }

  getPublishedItems(): any[] {
    const publishedItems = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('published_')) {
        const item = JSON.parse(localStorage.getItem(key) || '{}');
        publishedItems.push(item);
      }
    }
    return publishedItems;
  }

  clearPublishedItems() {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('published_')) {
        localStorage.removeItem(key);
      }
    }
  }
  
}
