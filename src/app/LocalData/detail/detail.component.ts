import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ImageSelectionDialogComponent } from '../../Dialog/image-selection-dialog/image-selection-dialog.component';
import { AddDataService } from '../../Service/addData.service';
import { DetailService } from '../../Service/detail.service';
import { EditDataService, Event, FoodsProducts, Image, Trip } from '../../Service/editData.service';
import { ImageService } from '../../Service/image.service';
import { PermissionService } from '../../Service/permission.service';
import { PublishService } from '../../Service/publish.service';
import { ThemeOptions } from '../../theme-options';


@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
})
export class DetailComponent implements OnInit {
  triggerMain: string | null = null;

  formData!: FormData;

  header!: string;
  item: any;
  username: string | null = null;

  images: Image[] = [];
  image: any | null = null;
  trips: Trip[] = [];
  tripData: any | null = null;
  events: Event[] = [];
  foodsProducts: FoodsProducts[] = [];

  constructor(
    public global: ThemeOptions,
    private permissionService: PermissionService,
    private publishService: PublishService,
    private detailService: DetailService,
    private editDataService: EditDataService,
    private addDataService: AddDataService,
    private imageService: ImageService,
    private router: Router,
    private dialog: MatDialog,
    ) { }

  ngOnInit(): void {
    if(this.permissionService.isAdmin()) {
      this.global.isAdmin = true;
    }else {
      this.global.isAdmin = false;
    }
    const data = this.detailService.getData();
    if (data) {
      this.header = data.header;
      this.item = data.item;
      if(this.item.imageId){
        this.editDataService.getOne<Image>('image', data.item.imageId).subscribe({
          next: (image: Image) => {
            this.item.imageData = this.imageDataUrl(image);
          },
          error: (error) => {
            console.error('Error fetching image:', error);
          }
        });
      }
    } else {
      this.router.navigate(['/home']);
      console.error('Error: No data provided');
    }

    this.editDataService.getAll<Image>('image').subscribe((images) => {
      this.images = images;
    })

    if (this.header === 'ชุมชน') {
      this.editDataService.getAll<Trip>('trip').subscribe((trips) => {
        this.trips = trips.filter(trip => trip.communityName === this.item.name && trip.publish === true);
      })

      this.editDataService.getAll<Event>('event').subscribe((events) => {
        this.events = events.filter(event => event.communityName === this.item.name && event.publish === true);
        this.loadPublishedImages('กิจกรรมสรรทนาการ', this.events);
      })
    }else if (this.header === 'อาหารและผลิตภัณฑ์') {
      this.editDataService.getAll<FoodsProducts>('fp').subscribe((foodsProducts) => {
        this.foodsProducts = foodsProducts.filter(fp => fp.publish === true);
        this.loadPublishedImages('อาหารและผลิตภัณฑ์', this.foodsProducts);
      });
    }
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.loadMap();
    });
}


onTriggerMain(mainType: string) {
  switch (mainType) {
    case 'เกี่ยวกับเรา':
      return '/about';
    case 'ติดต่อเรา':
      return '/contact';
    default:
      return '';
  }
}

isActiveMain(mainType: string) {
  if (this.triggerMain === mainType) {
    return;
  }

  const triggeredMain = mainType;
  this.router.navigate([triggeredMain]);
}

  loadMap() {
    const mapFrame = document.getElementById('mapFrame')
    if (mapFrame instanceof HTMLIFrameElement) { // ตรวจสอบว่าเป็น HTMLIFrameElement
      mapFrame.src = this.item.map;
    }
  }

  imageDataUrl(image: Image): string {
    return `data:${image.imageType};base64,${image.imageData}`;
  }

  chooseImage() {
    this.editDataService.getAll<Image>('image').subscribe(images => {
      const dialogRef = this.dialog.open(ImageSelectionDialogComponent, {
        width: '600px',
        data: images,// ส่งข้อมูลภาพไปยัง dialog
      });

      dialogRef.afterClosed().subscribe(selectedImage => {
        if (selectedImage.id) {
          this.publishService.imagePublish(this.header + '_' + this.item.name, selectedImage.id);
          this.editDataService.getOne<Image>('image', selectedImage.id).subscribe({
            next: (image: Image) => {
              this.item.imageData = this.imageDataUrl(image);
            },
            error: (error) => {
              console.error('Error fetching image:', error);
            }
          });
        }else {
          this.formData = this.imageService.getFormData();
          this.addDataService.save('image', this.formData).subscribe({
            next: (response: any) => {
              const imageId = response.imageId;
              this.publishService.imagePublish(this.header + '_' + this.item.name, imageId);
              this.editDataService.getOne<Image>('image', imageId).subscribe({
                next: (image: Image) => {
                  this.item.imageData = this.imageDataUrl(image);
                },
                error: (error) => {
                  console.error('Error fetching image:', error);
                }
              }) 
            },
            error: (error) => {
              console.error('Error saving image:', error);
            }
          })
        }
      });
      
    });
  }

  chooseImage2(type: string, item: any) {
    this.editDataService.getAll<Image>('image').subscribe(images => {
      const dialogRef = this.dialog.open(ImageSelectionDialogComponent, {
        width: '600px',
        data: images,// ส่งข้อมูลภาพไปยัง dialog
      });
      dialogRef.afterClosed().subscribe(selectedImage => {
        if (selectedImage.id) {
          this.publishService.imagePublish(type + '_' + item.name, selectedImage.id);
          this.editDataService.getOne<Image>('image', selectedImage.id).subscribe({
            next: (image: Image) => {
              item.imageData = this.imageDataUrl(image);
            },
            error: (error) => {
              console.error('Error fetching image:', error);
            }
          });
        }else {
          this.formData = this.imageService.getFormData();
          this.addDataService.save('image', this.formData).subscribe({
            next: (response: any) => {
              const imageId = response.imageId;
              if (this.header !== 'รูปภาพ') {
                this.publishService.imagePublish(type + '_' + item.name, imageId);
                this.editDataService.getOne<Image>('image', imageId).subscribe({
                  next: (image: Image) => {
                    item.imageData = this.imageDataUrl(image);
                  },
                  error: (error) => {
                    console.error('Error fetching image:', error);
                  }
                })
              }
            },
            error: (error) => {
              console.error('Error saving image:', error);
            }
          })
        }
      });
      
    });
  }

  getItems(): any[] {
    if (this.header === 'ชุมชน') {
      return this.events;
    }else if (this.item.tagName === 'อาหาร' || this.item.tagName === 'ผลิตภัณฑ์') {
      return this.foodsProducts;
    }else {
      return [];
    }
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
  getTrip(trip: any) {
    this.tripData = trip;
  }

  closeTrip() {
    this.tripData = null;
  }
}

