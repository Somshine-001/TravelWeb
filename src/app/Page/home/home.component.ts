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

  headers = ['ชุมชน', 'แหล่งท่องเที่ยว', 'อาหารและผลิตภัณฑ์', 'ข่าวประชาสัมพันธ์'];
  publishedItems: { [key: string]: any[] } = {};

  image: any;

  @Input() cardTypes!: string;

  constructor( 
    public global: ThemeOptions,
    private router: Router,
    private authService: AuthService,
    private publishService: PublishService,
    private permissionService: PermissionService
  ) { }

  ngOnInit() {
    if(this.permissionService.isAdmin()) {
      this.global.isAdmin = true;
    }
    this.loadPublishedItems();

    this.headers.forEach(header => {
      const items = this.getFilteredItems(header);
      items.forEach((item: any) => this.loadImages(header,item)); // เรียก loadImages สำหรับทุก item
    });

  }


  goToDetail(headers: string, item: any): void {
    const queryParams = {
        header: headers,
        item: JSON.stringify(item)
    };
    const url = this.router.createUrlTree(['/detail'], { queryParams }).toString();
    window.open(url, '_blank');
  }

  loadPublishedItems(): void {
    this.headers.forEach(type => {
      this.publishedItems[type] = this.publishService.getPublishedItems(type);
    });
  }
  loadImages(headers: string, item: any): void {
    this.image = this.publishService.getPublishedImages(headers + '_' + item.name);
    console.log(this.publishService.getPublishedImages(headers + '_' + item.name));
  }

  getHeaderName(item: any): any {
    const maxLength = 20;
    if (item && item.name && item.name.length > maxLength) {
      return item.name.substring(0, maxLength) + '...';
    } else {
      return item.name;
    }
  }

  getFilteredItems(header: string): any {
    const items = this.publishedItems[header] || [];
  
    // ถ้าจำนวนรายการน้อยกว่าหรือเท่ากับ 4 รายการ ให้แสดงทั้งหมด
    if (items.length <= 4) {
      return items;
    }
  
    // สร้าง Map เพื่อจัดกลุ่มรายการตามวันที่
    const groupedItems = items.reduce((groups: any, item: any) => {
      const dateKey = item.date;
      if (!groups[dateKey]) {
        groups[dateKey] = [];
      }
      groups[dateKey].push(item);
      return groups;
    }, {});
  
    // สร้างรายการที่แสดงเฉพาะรายการล่าสุดในแต่ละกลุ่มวันที่
    const latestItems = Object.keys(groupedItems).flatMap(dateKey => {
      const group = groupedItems[dateKey];
      group.sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime());
      return group.slice(0, 1); // เลือกรายการล่าสุดในแต่ละกลุ่ม
    });
  
    // จัดเรียงรายการล่าสุดตามวันที่
    latestItems.sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime());
  
    return latestItems.slice(0, 4); // แสดงเฉพาะ 3 รายการล่าสุด
  }

  unPublish(header: string, item: any): void {
    this.publishService.togglePublish(header, item);
  }
  
}
