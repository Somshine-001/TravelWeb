import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';

import { Router } from '@angular/router';
import { AddDataService } from '../Service/addData.service';
import { AuthService } from '../Service/auth.service';
import { Community, EditDataService, FoodsProducts, Image, News, Place, Plan, Province, Role, Tag, Trip, User } from '../Service/editData.service';
import { ImageService } from '../Service/image.service';
import { PermissionService } from '../Service/permission.service';
import { ThemeOptions } from '../theme-options';


@Component({
  selector: 'app-admin',
  template: '<quill-editor [beforeRender]="beforeRender"></quill-editor>',
  templateUrl: './admin.component.html',
})
export class AdminComponent implements OnInit {

  users: User[] = [];
  roles: Role[] = [];
  tags: Tag[] = [];
  provinces: Province[] = [];
  images: Image[] = [];
  communities: Community[] = [];
  places: Place[] = [];
  foodsProducts: FoodsProducts[] = [];
  trips: Trip[] = [];
  plans: Plan[] = [];
  events: Event[] = [];
  news: News[] = [];

  type = ['ชุมชน', 'แหล่งท่องเที่ยว', 'อาหารและผลิตภัณฑ์', 'แผนการท่องเที่ยว', 'กิจกรรมสรรทนาการ', 'ข่าวประชาสัมพันธ์', 'หมวดหมู่', 'สมาชิก', 'รูปภาพ']

  expandedCard: string | null = null;
  formName: string | null = null;
  addFormName: string | null = null;
  currentForm: FormGroup | null = null;
  planForm!: FormGroup;

  addUserForm!: FormGroup;
  addTagForm!: FormGroup;

  triggerMenu!: string;

  constructor
  (
    private addDataService: AddDataService,
    private editDataService: EditDataService,
    private toastr: ToastrService,
    private authService: AuthService,
    private router: Router,
    public global: ThemeOptions,
    private permissionService: PermissionService,
  ) { }

  ngOnInit(): void {

    if(this.authService.isLoggedIn()) {
      this.global.isLogin = true;
    }

    if(this.permissionService.isAdmin()) {
      this.global.isAdmin = true;
    }
    //ดึงข้อมูล
    this.editDataService.getData<Tag>('tag').subscribe({
      next: (tags) => {
        this.tags = tags;
      },
      error: (error) => {
        if (error.status === 403) {
          alert('Session หมดอายุ');
          this.authService.logout();
          window.location.href = '/login';
        }else{
          console.log(error);
          this.toastr.error('กำลังปิดปรับปรุงข้อมูล');
        }
      }
    });

    this.editDataService.getData<User>('user').subscribe((users) => {
      this.users = users;
    })

    this.editDataService.getData<Province>('province').subscribe((provinces) => {
      this.provinces = provinces;
    })

    this.editDataService.getData<Role>('role').subscribe((roles) => {
      this.roles = roles;
    })

    this.editDataService.getAll<Image>('image').subscribe((images) => {
      this.images = images;
      console.log(this.images);
    })

    this.editDataService.getAll<Community>('community').subscribe((communities) => {
      this.communities = communities;
    })

    this.editDataService.getAll<Place>('place').subscribe((places) => {
      this.places = places;
    })

    this.editDataService.getAll<FoodsProducts>('fp').subscribe((foodsProducts) => {
      this.foodsProducts = foodsProducts;
    })

    this.editDataService.getAll<Trip>('trip').subscribe((trips) => {
      this.trips = trips;
    })

    this.editDataService.getAll<Plan>('plan').subscribe((plans) => {
      this.plans = this.groupPlans(plans);
    })

    this.editDataService.getAll<Event>('event').subscribe((events) => {
      this.events = events;
    })

    this.editDataService.getAll<News>('news').subscribe((news) => {
      this.news = news;
    })

    this.isActiveMenu('ชุมชน');
  }

  //Value
  private groupPlans(plans: Plan[]): Plan[] {
    const groupedPlans = new Map<number, Plan>();

    plans.forEach(plan => {
        if (!groupedPlans.has(plan.id)) {
            groupedPlans.set(plan.id, {
                ...plan,
                planDetail: []
            });
        }

        const existingPlan = groupedPlans.get(plan.id);
        if (existingPlan) {
            if (Array.isArray(plan.planDetail) && Array.isArray(plan.planDetail)) {
                existingPlan.planDetail.push(...plan.planDetail);
            }
        }
    });

    return Array.from(groupedPlans.values());
}
  
  isActiveMenu(type: string) {
    if (this.triggerMenu === type) {
      return;
    }
    this.triggerMenu = type;
  }

  getItems(type: string): any[] {
    switch (type) {
      case 'ชุมชน': return this.communities;
      case 'แหล่งท่องเที่ยว': return this.places;
      case 'อาหารและผลิตภัณฑ์': return this.foodsProducts;
      case 'แผนการท่องเที่ยว': return this.trips;
      case 'กิจกรรมสรรทนาการ': return this.events;
      case 'ข่าวประชาสัมพันธ์': return this.news;
      case 'สมาชิก': return this.users;
      default: return [];
    }
  }

  getType(type: string): string {
    switch (type) {
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

  //Form
  getPlanForm(plan: any){
    this.planForm = plan
  }

  openEditForm(type: string, item: any) {
    this.formName = type;
    this.currentForm = item;
  }

  saveForm(type: string, formGroup: any) {
    return this.editDataService.update(this.getType(type), formGroup.value).subscribe(() => {
      this.closeForm();
      this.toastr.success('บันทึกข้อมูลสําเร็จ');
      // window.location.reload();
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

  //AddData
  toggleAddForm(type: string,) {
    this.addFormName = this.addFormName === type ? null : type;
  }

  addData(type: string, formGroup: any) {
    this.addDataService.save(this.getType(type), formGroup).subscribe({
      next: () => {
        this.toastr.success('บันทึกข้อมูลสําเร็จ');
      },
      error: (error) => {
        if (error.status === 403 || error.status === 401) {
          alert('Session หมดอายุ');
          this.authService.logout();
          this.router.navigate(['/login']);
        }
      }
    })

  }

}


