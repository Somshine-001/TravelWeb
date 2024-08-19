import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Community, EditDataService, FoodsProducts, News, Place, Plan, Event, Tag } from '../../Service/editData.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../Service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  template: '<quill-editor [beforeRender]="beforeRender"></quill-editor>',
  templateUrl: './edit.component.html',
})
export class EditComponent implements OnInit {

  tags: Tag[] = [];
  communities: Community[] = [];
  places: Place[] = [];
  foodsProducts: FoodsProducts[] = [];
  plans: Plan[] = [];
  events: Event[] = [];
  news: News[] = [];

  expandedCard: string | null = null;
  formName: string | null = null;
  currentForm: FormGroup | null = null;

  constructor(private editDataService: EditDataService, private toastr: ToastrService,private authService: AuthService, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    //ดึงข้อมูล
    this.editDataService.getAll<Tag>('tag').subscribe({
      next: (tags) => {
        this.tags = tags;
      },
      error: (error) => {
        if (error.status === 403) {
          alert('Session หมดอายุ');
          this.authService.logout();
          this.router.navigate(['/login']);
        }
      }
    });

    this.editDataService.getAll<Community>('community').subscribe((communities) => {
      this.communities = communities;
    })

    this.editDataService.getAll<Place>('place').subscribe((places) => {
      this.places = places;
    })

    this.editDataService.getAll<FoodsProducts>('fp').subscribe((foodsProducts) => {
      this.foodsProducts = foodsProducts;
    })

    this.editDataService.getAll<Plan>('plan').subscribe((plans) => {
      this.plans = plans;
    })

    this.editDataService.getAll<Event>('event').subscribe((events) => {
      this.events = events;
    })

    this.editDataService.getAll<News>('news').subscribe((news) => {
      this.news = news;
    })

  }

  getItems(type: string): any[] {
    switch (type) {
      case 'ชุมชน': return this.communities;
      case 'แหล่งท่องเที่ยว': return this.places;
      case 'อาหารและผลิตภัณฑ์': return this.foodsProducts;
      case 'แผนการท่องเที่ยว': return this.plans;
      case 'กิจกรรม': return this.events;
      case 'ข่าวประชาสัมพันธ์': return this.news;
      case 'หมวดหมู่': return this.tags;
      default: return [];
    }
  }

  getType(type: string): string {
    switch (type) {
      case 'ชุมชน': return 'community';
      case 'แหล่งท่องเที่ยว': return 'place';
      case 'อาหารและผลิตภัณฑ์': return 'fp';
      case 'แผนการท่องเที่ยว': return 'plan';
      case 'กิจกรรม': return 'event';
      case 'ข่าวประชาสัมพันธ์': return 'news';
      case 'หมวดหมู่': return 'tag';
      default: return '';
    }
  }

  toggleCard(cardType: string) {
    this.expandedCard = (this.expandedCard === cardType) ? null : cardType;
  }

  openEditForm(type: string, item: any) {
    this.formName = type;
    this.currentForm = item;
  }

  saveForm(type: string, formGroup: any) {
    return this.editDataService.update(this.getType(type), formGroup.value).subscribe(() => {
      this.closeForm();
      this.toastr.success('บันทึกข้อมูลสําเร็จ');
    })
  }

  closeForm() {
    this.formName = null;
  }

  deleteItem(type: string, id: number) {
    if (!id) {
      this.toastr.error('ไม่พบ ID');
      return;
    }
    this.editDataService.delete(this.getType(type), id).subscribe(() => {
      this.toastr.success('ลบข้อมูลสําเร็จ');
    })
  }

}


