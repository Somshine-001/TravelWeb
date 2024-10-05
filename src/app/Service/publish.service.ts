import { Injectable } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { EditDataService } from "./editData.service";

@Injectable({
    providedIn: "root",
})
export class PublishService {

    private readonly PUBLISH_KEY_IMAGE = 'image_';

    constructor(private toastr: ToastrService, private editDataService: EditDataService) {}


    private getImageKey(header: string): string {
        const sanitizedHeader = header.replace(/\s+/g, '');
        return `${this.PUBLISH_KEY_IMAGE}${sanitizedHeader}`;
    }

    togglePublish(cardType: string, item: any): void {
        item.publish = !item.publish;
        this.editDataService.update(cardType, item).subscribe(() => {
            this.toastr.success('สำเร็จ');
        })
    }

    imagePublish(header: string, image: any): void {
        const key = this.getImageKey(header);
        localStorage.removeItem(key);

        this.setPublishedImages(header, image);
        this.toastr.success('เพิ่มรูปภาพสำเร็จ');
    }

    getPublishedImages(header: string): number | null {
        const key = this.getImageKey(header);
        const storedValue = localStorage.getItem(key);

        if (storedValue) {
            const imageId = parseInt(storedValue, 10);
            return isNaN(imageId) ? null : imageId;
        }
        return null;
    }

    private setPublishedImages(header: string, images: any): void {
        const key = this.getImageKey(header);
        localStorage.setItem(key, images);
    }

}