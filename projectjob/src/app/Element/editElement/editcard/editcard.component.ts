import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-editcard',
  templateUrl: './editcard.component.html',
})
export class EditcardComponent {
  
  editForm!: FormGroup;
  
  @Input() header!: string;
  @Input() items!: any[];
  @Input() expandedCard!: string | null;
  @Input() cardType!: string;

  @Output() toggleCard = new EventEmitter<string>();
  @Output() openEditForm = new EventEmitter<any>();
  @Output() deleteItem = new EventEmitter<any>();

  constructor(private formBuilder: FormBuilder, private toastr: ToastrService) { }

  onToggleCard() {
    this.toggleCard.emit(this.cardType);
  }

  onToggleModal(item: any) {
    this.openEditForm.emit(item);
  }

  

  onDeleteItem(item: any) {
    const confirmation = confirm('คุณต้องการลบ' + this.cardType + 'ใช่หรือไม่');
    if (!confirmation) {
      return;
    }
    this.deleteItem.emit(this.getHeaderId(this.cardType, item));
    
  }

  toggleModalForm(items: any) {
    this.editForm = this.formBuilder.group(
      Object.keys(items).reduce((acc: any, key) => {
        acc[key] = [items[key]];
        return acc;
      }, {})
    )
    this.openEditForm.emit(this.editForm);
  }

  togglePublish(item: any) {
    const key = `published_${this.getHeaderName(this.cardType, item)}`;
    if (this.isPublished(item)) {
      localStorage.removeItem(key);
      this.toastr.warning('ยกเลิกการเผยแพร่ข้อมูลเรียบร้อยแล้ว');
      console.log(localStorage.getItem(key));
    } else {
      localStorage.setItem(key, JSON.stringify(item));
      this.toastr.success('ข้อมูลถูกเผยแพร่เรียบร้อยแล้ว');
      console.log(localStorage.getItem(key));
    }
  }

  isPublished(item: any): boolean {
    const key = `published_${this.getHeaderName(this.cardType, item)}`;
    return localStorage.getItem(key) !== null;
  }

  getHeaderName(cardType: string, item: any): string {
    switch (cardType) {
      case 'ชุมชน':
        return item.communityName;
      case 'แหล่งท่องเที่ยว':
        return item.placeName;
      case 'อาหารและผลิตภัณฑ์':
        return item.fpName;
      case 'แผนการท่องเที่ยว':
        return item.planName;
      case 'กิจกรรม':
        return item.eventName;
      case 'ข่าวประชาสัมพันธ์':
        return item.newsName;
      case 'หมวดหมู่':
        return item.tagName;
      default:
        return 'ไม่ทราบ';
    }
  }

  getHeaderId(cardType: string, item: any): string {
    switch (cardType) {
      case 'ชุมชน':
        return item.communityId;
      case 'แหล่งท่องเที่ยว':
        return item.placeId;
      case 'อาหารและผลิตภัณฑ์':
        return item.fpId;
      case 'แผนการท่องเที่ยว':
        return item.planId;
      case 'กิจกรรม':
        return item.eventId;
      case 'ข่าวประชาสัมพันธ์':
        return item.newsId;
      case 'หมวดหมู่':
        return item.tagId;
      default:
        return 'ไม่ทราบ';
    }
  }
}

