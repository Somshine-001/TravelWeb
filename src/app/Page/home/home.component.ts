import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../Service/auth.service';
import { PublishService } from '../../Service/publish.service';

import { PermissionService } from '../../Service/permission.service';
import { ThemeOptions } from '../../theme-options';
import { Community, EditDataService, FoodsProducts, News, Place, Plan, Trip, Event, Image } from '../../Service/editData.service';
import { DetailService } from '../../Service/detail.service';
import { ImageSelectionDialogComponent } from '../../Dialog/image-selection-dialog/image-selection-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {

  headers = ['ชุมชน', 'แหล่งท่องเที่ยว', 'อาหารและผลิตภัณฑ์', 'ข่าวประชาสัมพันธ์'];
  images: Image[] = [];
  communities: Community[] = [];
  places: Place[] = [];
  foodsProducts: FoodsProducts[] = [];
  trips: Trip[] = [];
  plans: Plan[] = [];
  events: Event[] = [];
  news: News[] = [];

  publishedImageId: number | null = null;
  imageData: Image | null = null;
  image: any | null = null;


  @Input() cardTypes!: string;

  constructor( 
    public global: ThemeOptions,
    private router: Router,
    private publishService: PublishService,
    private permissionService: PermissionService,
    private editDataService: EditDataService,
    private detailService: DetailService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    if(this.permissionService.isAdmin()) {
      this.global.isAdmin = true;
    }

    this.loadAllData();

  }

  loadAllData() {
    this.editDataService.getAll<Community>('community').subscribe((communities) => {
      this.communities = communities.filter(community => community.publish === true);
      this.loadPublishedImages('ชุมชน', this.communities);
    });

    this.editDataService.getAll<Place>('place').subscribe((places) => {
      this.places = places.filter(place => place.publish === true);
      this.loadPublishedImages('แหล่งท่องเที่ยว', this.places);
    });

    this.editDataService.getAll<FoodsProducts>('fp').subscribe((foodsProducts) => {
      this.foodsProducts = foodsProducts.filter(fp => fp.publish === true);
      this.loadPublishedImages('อาหารและผลิตภัณฑ์', this.foodsProducts);
    });

    this.editDataService.getAll<Trip>('trip').subscribe((trips) => {
      this.trips = trips.filter(trip => trip.publish === true);
    });

    this.editDataService.getAll<Plan>('plan').subscribe((plans) => {
      this.plans = plans;
    });

    this.editDataService.getAll<News>('news').subscribe((news) => {
      this.news = news.filter(newsItem => newsItem.publish === true);
      this.loadPublishedImages('ข่าวประชาสัมพันธ์', this.news);
    });

    this.editDataService.getAll<Event>('event').subscribe((events) => {
      this.events = events.filter(event => event.publish === true);
      this.loadPublishedImages('กิจกรรมสรรทนาการ', this.events);
    });

    if(!this.image){
      const imageId =this.publishService.getPublishedImages('banner');
      if(imageId){
        this.editDataService.getOne<Image>('image', imageId).subscribe({
          next: (image: Image) => {
            this.image = this.imageDataUrl(image);
          },
          error: (error) => {
            console.error('Error fetching image:', error);
          }
        });
      }
    }
  }

  getItems(headers: string): any[] {
    switch (headers) {
      case 'ชุมชน': return this.communities;
      case 'แหล่งท่องเที่ยว': return this.places;
      case 'อาหารและผลิตภัณฑ์': return this.foodsProducts;
      case 'ข่าวประชาสัมพันธ์': return this.news;
      default: return [];
    }
  }

  goToDetail(headers: string, item: any): void {
    const itemCopy = {...item};
    delete itemCopy.imageData;
    this.detailService.setData({ header: headers, item: itemCopy });
    this.router.navigate(['/detail']);
  }

  loadPublishedImages(header: string, items: any[]) {
    items.forEach(item => {
      const imageId = this.publishService.getPublishedImages(header + '_' + item.name);
      if (!imageId) {
        return;
      }
      this.editDataService.getOne<Image>('image', imageId).subscribe({
        next: (image: Image) => {
          item.imageData = this.imageDataUrl(image);
          item.imageId = image.id;
        },
        error: (error) => {
          console.error('Error fetching image:', error);
        }
      });
    });
  }

  imageDataUrl(image: Image): string {
    return `data:${image.imageType};base64,${image.imageData}`;
  }

  chooseImage() {
    this.editDataService.getAll<Image>('image').subscribe(images => {
      const dialogRef = this.dialog.open(ImageSelectionDialogComponent, {
        width: '600px',
        data: images, // ส่งข้อมูลภาพไปยัง dialog
      });

      dialogRef.afterClosed().subscribe(selectedImage => {
        if (selectedImage) {
          this.publishService.imagePublish('banner', selectedImage.id);
          this.editDataService.getOne<Image>('image', selectedImage.id).subscribe({
            next: (image: Image) => {
              this.image = this.imageDataUrl(image);
            },
            error: (error) => {
              console.error('Error fetching image:', error);
            }
          });
        }
      });
      
    });
  }

  getHeaderName(item: any): any {
    const maxLength = 20;
    if (item && item.name && item.name.length > maxLength) {
      return item.name.substring(0, maxLength) + '...';
    } else {
      return item.name;
    }
  }


  unPublish(header: string, item: any): void {
    switch (header) {
      case 'ชุมชน': header = 'community'; break;
      case 'แหล่งท่องเที่ยว': header = 'place'; break;
      case 'อาหารและผลิตภัณฑ์': header = 'fp'; break;
      case 'ข่าวประชาสัมพันธ์': header = 'news'; break;
      default: header = '';
    }
    this.publishService.togglePublish(header, item);
  }
  
}
