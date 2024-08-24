import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../Service/auth.service';
import { PublishService } from '../../Service/publish.service';

import { PermissionService } from '../../Service/permission.service';
import { ThemeOptions } from '../../theme-options';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {

  headers = ['ชุมชน', 'แหล่งท่องเที่ยว', 'อาหารและผลิตภัณฑ์', 'แผนการท่องเที่ยว', 'กิจกรรมสรรทนาการ', 'ข่าวประชาสัมพันธ์'];

  publishedItems: { [key: string]: any[] } = {};

  @Input() cardTypes!: string;

  constructor( public global: ThemeOptions, private router: Router, private authService: AuthService, private publishService: PublishService, private permissionService: PermissionService) { }

  ngOnInit() {
    if(this.permissionService.isAdmin()) {
      this.global.isAdmin = true;
    }
    this.loadPublishedItems();
  }

  goToDetail(type: string, item: any): void {
    this.router.navigate(['/detail', type, item.id]);
  }

  loadPublishedItems(): void {
    this.headers.forEach(type => {
      this.publishedItems[type] = this.publishService.getPublishedItems(type);
    });
  }

  getHeaderName(header: string, item: any): any {
    const maxLength = 30;
    switch (header) {
      case 'ชุมชน':
        if (item.communityName.length > maxLength) {
          return item.communityName.substring(0, maxLength) + '...';
        }
        return item.communityName;
      case 'แหล่งท่องเที่ยว':
        if (item.placeName.length > maxLength) {
          return item.placeName.substring(0, maxLength) + '...';
        }
        return item.placeName;
      case 'อาหารและผลิตภัณฑ์':
        if (item.fpName.length > maxLength) {
          return item.fpName.substring(0, maxLength) + '...';
        }
        return item.fpName;
      case 'แผนการท่องเที่ยว':
        if (item.planName.length > maxLength) {
          return item.planName.substring(0, maxLength) + '...';
        }
        return item.planName;
      case 'กิจกรรมสรรทนาการ':
        if (item.eventName.length > maxLength) {
          return item.eventName.substring(0, maxLength) + '...';
        }
        return item.eventName;
      case 'ข่าวประชาสัมพันธ์':
        if (item.newsName.length > maxLength) {
          return item.newsName.substring(0, maxLength) + '...';
        }
        return item.newsName;
      default:
        return '';
    }
    
  }

  clearPublishedItems() {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('published_')) {
        localStorage.removeItem(key);
      }
    }
  }

  unPublish(header: string, item: any): void {
    this.publishService.togglePublish(header, item);
  }
  
}
