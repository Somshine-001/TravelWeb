import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AddDataService } from '../../Service/addData.service';
import { AuthService } from '../../Service/auth.service';
import { Community, EditDataService, Tag } from '../../Service/editData.service';
import { Router } from '@angular/router';


@Component({
 
  selector: 'app-add',
  template: '<quill-editor [beforeRender]="beforeRender"></quill-editor>',
  templateUrl: './add.component.html',

})
export class AddComponent implements OnInit{
  communities: Community[] = [];
  tags: Tag[] = [];

  expandedCard: string | null = null;
  isHidden = false;
  
  constructor(
    private authService: AuthService,
    private addDataService: AddDataService,
    private editDataService: EditDataService,
    private toastr: ToastrService,
    private router: Router
  ) {  }

  ngOnInit() {
    this.editDataService.getAll<Tag>('tag').subscribe({
      next: (tags) => {
        this.tags = tags;
      },
    error: (error) => {
      if (error.status === 403 || error.status === 401) {
        alert('Session หมดอายุ');
        this.authService.logout();
        this.router.navigate(['/login']);
      }
    }
  }),

    this.editDataService.getAll<Community>('community').subscribe((communities) => {
      this.communities = communities;
    })
  }

  getType(type: string) {
    switch (type) {
      case 'ชุมชน':
        return 'community';
      case 'แหล่งท่องเที่ยว':
        return 'place';
      case 'อาหารและผลิตภัณฑ์':
        return 'fp';
      case 'แผนการท่องเที่ยว':
        return 'plan';
      case 'กิจกรรมสรรทนาการ':
        return 'event';
      case 'ข่าวประชาสัมพันธ์':
        return 'news';
      default:
        return '';
    };
  }

  toggleCard(cardType: string) {
    this.expandedCard = this.expandedCard === cardType ? '' : cardType;
  }

  saveForm(type: string, formGroup: any) {
    console.log(formGroup);
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


