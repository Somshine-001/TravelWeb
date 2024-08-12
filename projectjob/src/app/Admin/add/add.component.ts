import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AddDataService } from '../../Service/addData.service';
import { AuthService } from '../../Service/auth.service';
import { Community, EditDataService, Tag } from '../../Service/editData.service';


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
  //Form
  communityForm!: FormGroup;
  placeForm!: FormGroup;
  FpForm!: FormGroup;
  planForm!: FormGroup;
  eventForm!: FormGroup;
  newsForm!: FormGroup;

  
  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private addDataService: AddDataService,
    private editDataService: EditDataService,
    private toastr: ToastrService
  ) {  }

  ngOnInit() {
    this.editDataService.getAllCommu().subscribe((communities) => {
      this.communities = communities;
    },
    (error) => {
      if (error.status === 401 || error.status === 403) {
        this.authService.logout();
      }
    });

    this.editDataService.getAllTag().subscribe((tags) => {
      this.tags = tags;
    },
    (error) => {
      if (error.status === 401 || error.status === 403) {
        this.authService.logout();
      }
    });


    this.communityForm = this.formBuilder.group({
      name: ['',[Validators.required, Validators.maxLength(50)]],
      details: ['',[Validators.required]],
      tel: ['',[Validators.required, Validators.pattern('^[0-9]*$'), Validators.minLength(8)]],   
    });

    this.placeForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(50)]],
      details: ['', [Validators.required]],
      tel: ['', [Validators.required, Validators.pattern('^[0-9]*$'), Validators.minLength(8)]],
      latitude: ['', [Validators.required]],
      longitude: ['', [Validators.required]],
      communityName: ['', [Validators.required]],
      tagName: ['', [Validators.required]],
    });

    this.FpForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(50)]],
      details: ['', [Validators.required]],
      communityName: ['', [Validators.required]],
      tagName: ['', [Validators.required]],
    });

    this.planForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(50)]],
      details: ['', [Validators.required]],
      communityName: ['', [Validators.required]],
    });

    this.eventForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(50)]],
      details: ['', [Validators.required]],
      communityName: ['', [Validators.required]],
      tagName: ['', [Validators.required]],
    });

    this.newsForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(50)]],
      details: ['', [Validators.required]],
      communityName: ['', [Validators.required]],
    });
  }

  toggleCard(cardName: string) {
    if (this.expandedCard === cardName) {
      this.expandedCard = null;
    } else {
      this.expandedCard = cardName;
    }

  }
  saveCommu() {
    if (this.communityForm.value.name == '') {
      this.toastr.error('กรอกข้อมูล**','', {
      })
      return;
    }
    
    const commu = {
      communityName: this.communityForm.value.name,
      communityTitle: this.communityForm.value.details,
      tel: this.communityForm.value.tel,
    };

    this.addDataService.saveCommu(commu).subscribe({
      next: (response) => {
        alert('บันทึกข้อมูลสำเร็จ');
        console.log('response:', response);
      },
      error: (error) => {
        if (error.status === 403 || error.status === 401) {
          alert('กรุณาเข้าสู่ระบบใหม่อีกครั้ง');
          this.authService.logout();
        }
      }
    });

    this.communityForm.reset();
    window.location.href = '/add';
  }

  savePlace() {
    if (this.placeForm.value.communityName == '' || this.placeForm.value.name == '') {
      this.toastr.error('กรอกข้อมูล**','', {
      });
      return;
    }

    const place = {
      placeName: this.placeForm.value.name,
      placeTitle: this.placeForm.value.details,
      tel: this.placeForm.value.tel,
      placeGps: this.placeForm.value.latitude + ',' + this.placeForm.value.longitude,
      communityName: this.placeForm.value.communityName,
      tagName: this.placeForm.value.tagName
    };
    console.log(place);
  
    this.addDataService.savePlace(place).subscribe({
      next: (response) => {
        console.log('response:', response);
        alert('บันทึกข้อมูลสำเร็จ');
      },
      error: (error) => {
        if (error.status === 403 || error.status === 401) {
          this.toastr.error('Session หมดอายุ');
          this.authService.logout();
        }
      }
    });

    this.placeForm.reset();
    window.location.href = '/add';
  }

  saveFp() {
    if (this.FpForm.value.communityName == '' || this.FpForm.value.name == '') {
      this.toastr.error('กรอกข้อมูล**','', {
      });
      return;
    }

    const fp = {
      fpName: this.FpForm.value.name,
      fpDetail: this.FpForm.value.details,
      communityName: this.FpForm.value.communityName,
      tagName: this.FpForm.value.tagName
    };

    
    // this.addDataService.saveFp(fp).subscribe({
    //   next: (response) => {
    //     console.log('response:', response);
    //     alert('บันทึกข้อมูลสำเร็จ');
    //   },
    //   error: (error) => {
    //     if (error.status === 403 || error.
    //     if (error.status === 403 || error.status === 401) {
    //       this.toastr.error('Session หมดอายุ');
    //       this.authService.logout();
    //     }
    //   }
    // });

    // this.FpForm.reset();
    window.location.href = '/add';
  }


  savePlan() {
    if (this.planForm.value.communityName == '' || this.planForm.value.name == '') {
      this.toastr.error('กรอกข้อมูล**','', {
      });
      return;
    }

    const plan = {
      planName: this.planForm.value.name,
      planDetail: this.planForm.value.details,
      communityName: this.planForm.value.communityName
    };

    // this.addDataService.savePlan(plan).subscribe({
    //   next: (response) => {
    //     console.log('response:', response);
    //     alert('บันทึกข้อมูลสำเร็จ');
    //   },
    //   error: (error) => {
    //     if (error.status === 403 || error.status === 401) {
    //       this.toastr.error('Session หมดอายุ');
    //       this.authService.logout();
    //     }
    //   }
    // });
    // this.planForm.reset();
    window.location.href = '/add';
  }

  saveEvent() {
    if (this.eventForm.value.communityName == '' || this.eventForm.value.name == '') {
      this.toastr.error('กรอกข้อมูล**','', {
      });
      return;
    }

    const event = {
      eventName: this.eventForm.value.name,
      eventDetail: this.eventForm.value.details,
      communityName: this.eventForm.value.communityName,
      tagName: this.eventForm.value.tagName
    };

    // this.addDataService.saveEvent(event).subscribe({
    //   next: (response) => {
    //     console.log('response:', response);
    //     alert('บันทึกข้อมูลสำเร็จ');
    //   },
    //   error: (error) => {
    //     if (error.status === 403 || error.status === 401) {
    //       this.toastr.error('Session หมดอายุ');
    //       this.authService.logout();
    //     }
    //   }
    // });
    // this.eventForm.reset();
    window.location.href = '/add';
  }

  saveNews() {
    if (this.newsForm.value.communityName == '' || this.newsForm.value.name == '') {
      this.toastr.error('กรอกข้อมูล**','', {
      });
      return;
    }

    const news = {
      newsName: this.newsForm.value.name,
      newsDetail: this.newsForm.value.details,
      communityName: this.newsForm.value.communityName
    };

    // this.addDataService.saveNews(news).subscribe({
    //   next: (response) => {
    //     console.log('response:', response);
    //     alert('บันทึกข้อมูลสำเร็จ');
    //   },
    //   error: (error) => {
    //     if (error.status === 403 || error.status === 401) {
    //       this.toastr.error('Session หมดอายุ');
    //       this.authService.logout();
    //     }
    //   }
    // });
    // this.newsForm.reset();
    window.location.href = '/add';
  }

  codeHidden(){
    this.isHidden = !this.isHidden;
  }



}


