import { Component, Input, OnInit } from '@angular/core';
import { ThemeOptions } from '../../theme-options';
import { PermissionService } from '../../Service/permission.service';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../../Service/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PublishService } from '../../Service/publish.service';
import { EditDataService } from '../../Service/editData.service';
import { Image } from '../../Service/editData.service';
import { ImageSelectionDialogComponent } from '../../Dialog/image-selection-dialog/image-selection-dialog.component';
import { DetailService } from '../../Service/detail.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
})
export class DetailComponent implements OnInit {

  header!: string;
  item: any;
  username: string | null = null;

  images: Image[] = [];
  image: any | null = null;

  constructor(
    public global: ThemeOptions,
    private permissionService: PermissionService,
    private publishService: PublishService,
    private detailService: DetailService,
    private editDataService: EditDataService,
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
          this.publishService.imagePublish(this.header + '_' + this.item.name, selectedImage.id);
          this.editDataService.getOne<Image>('image', selectedImage.id).subscribe({
            next: (image: Image) => {
              this.item.imageData = this.imageDataUrl(image);
            },
            error: (error) => {
              console.error('Error fetching image:', error);
            }
          });
        }
      });
      
    });
  }

}

interface CustomState {
  header: string;
  item: any;
}
