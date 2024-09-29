import { Injectable } from "@angular/core";
import { ToastrService } from "ngx-toastr";

@Injectable({
    providedIn: "root",
})
export class PublishService {
    private readonly PUBLISHED_KEY_PREFIX = 'published_';
    private readonly PUBLISH_KEY_IMAGE = 'image_';

    constructor(private toastr: ToastrService) {}

    private getKey(cardType: string): string {
        return `${this.PUBLISHED_KEY_PREFIX}${cardType}`;
    }
    private getImageKey(header: string): string {
        return `${this.PUBLISH_KEY_IMAGE}${header}`;
    }

    togglePublish(cardType: string, item: any): void {
        const key = this.getKey(cardType);
        const publishedItems = this.getPublishedItems(cardType);

        const headerName = item.name;
        const itemIndex = publishedItems.findIndex(i => i.name === headerName);

        if (itemIndex !== -1) {
            // Item is already published; remove it from the array
            publishedItems.splice(itemIndex, 1);
            this.toastr.warning('ยกเลิกการเผยแพร่ข้อมูลเรียบร้อยแล้ว');
        } else {
            // Item is not published; add it to the array
            publishedItems.push(item);
            this.toastr.success('ข้อมูลถูกเผยแพร่เรียบร้อยแล้ว');
        }

        this.setPublishedItems(cardType, publishedItems);
    }

    imagePublish(header: string, image: any): void {
        const key = this.getImageKey(header);
        console.log(key);
        const publishedImages = this.getPublishedImages(header);
        console.log(publishedImages);

        const headerName = image.id
        const itemIndex = publishedImages.findIndex(i => i.id === headerName);

        if (itemIndex !== -1) {
            // Item is already published; remove it from the array
            publishedImages.splice(itemIndex, 1);
            this.toastr.warning('นำรูปภาพออกแล้ว');
        } else {
            // Item is not published; add it to the array
            publishedImages.push(image);
            this.toastr.success('เพิ่มรูปภาพสำเร็จ');
        }

        this.setPublishedImages(header, publishedImages);
    }

    isPublished(cardType: string, item: any): boolean {
        const key = this.getKey(cardType);
        const publishedItems = this.getPublishedItems(cardType);
        const headerName = item.name;
        return publishedItems.some(i => i.name === headerName);
    }

    getPublishedItems(cardType: string): any[] {
        const key = this.getKey(cardType);
        return JSON.parse(localStorage.getItem(key) || '[]');
    }
    getPublishedImages(header: string): any[] {
        const key = this.getImageKey(header);
        return JSON.parse(localStorage.getItem(key) || '[]')
    }

    private setPublishedItems(cardType: string, items: any[]): void {
        const key = this.getKey(cardType);
        if (items.length === 0) {
            localStorage.removeItem(key);
        } else {
            localStorage.setItem(key, JSON.stringify(items));
        }
    }
    private setPublishedImages(header: string, images: any[]): void {
        const key = this.getImageKey(header);
        if (images.length === 0) {
            localStorage.removeItem(key);
        } else {
            localStorage.setItem(key, JSON.stringify(images));
        }
    }
}