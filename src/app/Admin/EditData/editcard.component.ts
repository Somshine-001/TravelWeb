import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { PublishService } from '../../Service/publish.service';

@Component({
  selector: 'app-editcard',
  templateUrl: './editcard.component.html',
})
export class EditcardComponent {
  
  editForm!: FormGroup;

  keyValue: string | null = null;
  
  @Input() header!: string;
  @Input() items!: any[];
  @Input() cardType!: string;
  @Input() plans!: any[];

  @Output() toggleCard = new EventEmitter<string>();
  @Output() openEditForm = new EventEmitter<any>();
  @Output() deleteItem = new EventEmitter<any>();

  constructor(private formBuilder: FormBuilder, private toastr: ToastrService, private publishService: PublishService) { }

  onToggleCard() {
    this.toggleCard.emit(this.cardType);
  }

  onDeleteItem(item: any) {
    const confirmation = confirm('คุณต้องการลบ' + this.cardType + 'ใช่หรือไม่');
    if (!confirmation) {
      return;
    }
    this.deleteItem.emit(item.id);
    
  }

  toggleModalForm(items: any) {
    this.editForm = this.formBuilder.group(
      Object.keys(items).reduce((acc: any, key) => {
        acc[key] = [items[key]];
        return acc;
      }, {})
      
    );
    this.openEditForm.emit(this.editForm);
  }

  get detailFormArray() {
    return this.editForm.get('detail') as FormArray;
  }
  

  onTogglePublish(item: any): void {
    this.publishService.togglePublish(this.cardType, item);
  }

  checkIfPublished(item: any): boolean {
    return this.publishService.isPublished(this.cardType, item);
  }
}

