import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ImageService } from '../../Service/image.service';
import { AddDataService } from '../../Service/addData.service';

@Component({
  selector: 'app-image-selection-dialog',
  templateUrl: './image-selection-dialog.component.html',
})
export class ImageSelectionDialogComponent {

  selectedFile: File | null = null;
  imagePreview: string | null = null;

  constructor(
    public dialogRef: MatDialogRef<ImageSelectionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public images: any[],
    private imageService: ImageService,
    private addDataService: AddDataService,
  ) {}

  selectImage(image: any) {
    this.dialogRef.close(image); // ปิด dialog และส่งค่าภาพที่เลือก
  }

  onNoClick(): void {
    this.dialogRef.close(); // ปิด dialog โดยไม่เลือกภาพ
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.imageService.resizeAndOptimizeImage(file, 800, 800, 0.8)
        .then(blob => {
          this.imageService.setFile(blob, file.name);
          const optimizedImageURL = URL.createObjectURL(blob);
          console.log(optimizedImageURL);
          this.selectImage(optimizedImageURL);
        })
        .catch(error => {
          console.error('Error optimizing image:', error);
        });
    }
  }

}

