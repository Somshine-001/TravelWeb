import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { PublishService } from '../../../Service/publish.service';

@Component({
  selector: 'app-editcard',
  templateUrl: './editcard.component.html',
})
export class EditcardComponent {
  
  editForm!: FormGroup;

  keyValue: string | null = null;
  
  @Input() header!: string;
  @Input() items!: any[];
  @Input() expandedCard!: string | null;
  @Input() cardType!: string;

  @Output() toggleCard = new EventEmitter<string>();
  @Output() openEditForm = new EventEmitter<any>();
  @Output() deleteItem = new EventEmitter<any>();

  constructor(private formBuilder: FormBuilder, private toastr: ToastrService, private publishService: PublishService) { }

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

  onTogglePublish(item: any): void {
    this.publishService.togglePublish(this.cardType, item);
  }

  checkIfPublished(item: any): boolean {
    return this.publishService.isPublished(this.cardType, item);
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
      case 'กิจกรรมสรรทนาการ':
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

