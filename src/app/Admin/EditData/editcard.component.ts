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
  planForm!: FormGroup;
  fullImage: string | null = null;

  keyValue: string | null = null;
  
  @Input() header!: string;
  @Input() items!: any[];
  @Input() cardType!: string;
  @Input() plans!: any[];
  @Input() images!: any[];

  @Output() getPlanForm = new EventEmitter<any>();
  @Output() openEditForm = new EventEmitter<any>();
  @Output() deleteItem = new EventEmitter<number>();

  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private publishService: PublishService,
  ) { }

  onDeleteItem(item: any) {
    const confirmation = confirm('คุณต้องการลบ' + this.cardType + 'ใช่หรือไม่');
    if (!confirmation) {
      return;
    }
    this.deleteItem.emit(item.id);
  }

  toggleModalForm(items: any) {
      if (this.cardType === 'แผนการท่องเที่ยว') {
        this.editForm = this.formBuilder.group({
          ...Object.keys(items).reduce((acc: any, key) => {
            acc[key] = [items[key]];
            return acc;
          }, {}),
          plans: this.formBuilder.array([])
        });
        this.createPlanForm(this.plans, items.id);
      }else{
        this.editForm = this.formBuilder.group(
          Object.keys(items).reduce((acc: any, key) => {
            acc[key] = [items[key]];
            return acc;
          }, {})
        );
      }
    this.openEditForm.emit(this.editForm);
  }

  private createPlanForm(plans: any[], id: number) {
    // สร้าง FormArray สำหรับ plans
    const plansArray = this.formBuilder.array(
      plans.filter(plan => plan.tripId === id).reverse().map(plan => {
        return this.formBuilder.group({
          name: [plan.name],
          id: [plan.id],
          tripId: [plan.tripId],
          planDetail: this.formBuilder.array(
            plan.planDetail.map((detail: any) => 
              this.formBuilder.group({
                time: [detail.time],
                describe: [detail.describe]
              })
            )
          )
        });
      })
    );
  
    // สร้าง FormGroup ที่เก็บ FormArray

    this.planForm = this.formBuilder.group({
      plans: plansArray
    });

    this.editForm.setControl('plans', plansArray);
    this.getPlanForm.emit(this.planForm);
  }

  get detailFormArray() {
    return this.editForm.get('detail') as FormArray;
  }
  

  onTogglePublish(item: any): void {
    this.publishService.togglePublish(this.getCardType(), item);
  }

  showFullImage(image: any): void {
    this.fullImage = 'data:' + image.imageType + ';base64,' + image.imageData;
  }

  closeFullImage(): void {
    this.fullImage = null;
  }

  getCardType(): string {
    switch(this.cardType) {
      case 'ชุมชน': return 'community';
      case 'แหล่งท่องเที่ยว': return 'place';
      case 'อาหารและผลิตภัณฑ์': return 'fp';
      case 'แผนการท่องเที่ยว': return 'trip';
      case 'กิจกรรมสรรทนาการ': return 'event';
      case 'ข่าวประชาสัมพันธ์': return 'news';
      case 'สมาชิก': return 'user';
      case 'หมวดหมู่': return 'tag';
      case 'รูปภาพ': return 'image';
      default: return '';
    }
  }
}

