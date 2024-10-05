import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-image-selection-dialog',
  templateUrl: './image-selection-dialog.component.html',
})
export class ImageSelectionDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ImageSelectionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public images: any[] // ค่าที่ส่งจาก component หลัก
  ) {}

  selectImage(image: any) {
    this.dialogRef.close(image); // ปิด dialog และส่งค่าภาพที่เลือก
  }

  onNoClick(): void {
    this.dialogRef.close(); // ปิด dialog โดยไม่เลือกภาพ
  }
}
