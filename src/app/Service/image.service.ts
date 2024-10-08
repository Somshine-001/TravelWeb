import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: "root",
})
export class ImageService {

  private formData: FormData = new FormData();

  setFile(blob: Blob, fileName: string) {
    this.formData.append('file', blob, fileName);
  }

  getFormData(): FormData {
    return this.formData;
  }
  
    resizeAndOptimizeImage(imageFile: File, maxWidth: number, maxHeight: number, quality: number = 1): Promise<Blob> {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(imageFile);
          reader.onload = (event) => {
            if (event.target && event.target.result) {
              const img = new Image();
              img.src = event.target.result as string;
              img.onload = () => {
                let width = img.width;
                let height = img.height;
          
                // คำนวณขนาดภาพใหม่
                if (width > maxWidth) {
                  height = Math.round((maxWidth / width) * height);
                  width = maxWidth;
                }
                if (height > maxHeight) {
                  width = Math.round((maxHeight / height) * width);
                  height = maxHeight;
                }
          
                const canvas = document.createElement('canvas');
                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext('2d');
                
                if (ctx) {
                  ctx.drawImage(img, 0, 0, width, height);
          
                  canvas.toBlob((blob) => {
                    if (blob) {
                      resolve(blob);
                    } else {
                      reject(new Error('Failed to create Blob from canvas'));
                    }
                  }, 'image/png', quality);
                } else {
                  reject(new Error('Failed to get canvas context'));
                }
              };
            } else {
              reject(new Error('Failed to read image file'));
            }
          };
          reader.onerror = (error) => reject(error);
        });
      }
}