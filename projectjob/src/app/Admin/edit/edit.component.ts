import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Community, EditDataService, FoodsProducts, News, Place, Plan, Event, Tag } from '../../Service/editData.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit',
  template: '<quill-editor [beforeRender]="beforeRender"></quill-editor>',
  templateUrl: './edit.component.html',
})
export class EditComponent  implements OnInit{

  tags: Tag[] = [];
  communities: Community[] = [];
  places: Place[] = [];
  foodsProducts: FoodsProducts[] = [];
  plans: Plan[] = [];
  events: Event[] = [];
  news: News[] = [];

  tagForm!: FormGroup;
  communityForm!: FormGroup;
  placeForm!: FormGroup;
  fpForm!: FormGroup;
  planForm!: FormGroup;
  eventForm!: FormGroup;
  newsForm!: FormGroup;

  expandedCard: string | null = null;
  showForm: string | null = null;
  showDeleteForm: string | null = null;
  submitted = false;
  isHidden = false;
  isOpen = false;

  constructor(private editDataService: EditDataService, private formBuilder: FormBuilder, private toastr: ToastrService) { }

  ngOnInit(): void {
    //ดึงข้อมูล
    this.editDataService.getAllTag().subscribe((tags) => {
      this.tags = tags;
    });
    
    this.editDataService.getAllCommu().subscribe((communities) => {
      this.communities = communities;
    });

    this.editDataService.getAllPlace().subscribe((places) => {
      this.places = places;
    });

    this.editDataService.getAllFp().subscribe((foodsProducts) => {
      this.foodsProducts = foodsProducts;
    });

    this.editDataService.getAllPlan().subscribe((plans) => {
      this.plans = plans;
    });

    this.editDataService.getAllEvent().subscribe((events) => {
      this.events = events;
    });

    this.editDataService.getAllNews().subscribe((news) => {   
      this.news = news;
    });
  }

  

  //Form-button
  updateTag(): void {
    this.submitted = true; 
    if (this.tagForm) {
      const updatedTag = {
        tagId: this.tagForm.value.tagId,
        tagName: this.tagForm.value.tagName
      };
      // this.editDataService.updateTag(updatedTag).subscribe((response) => {
      //   console.log('response:', response);
      // });
      // this.toggleModal('tag');
    }
  }
  deleteTag(tag: Tag): void {
    const deleteTag = {
      tagId: tag.tagId,
    };
    this.editDataService.deleteTag(deleteTag).subscribe((response) => {
      console.log('response:', response);
    });
  }

  updateCommu(): void {
    this.submitted = true; 
    if (this.communityForm) {
      const updatedCommunity = {
        communityId: this.communityForm.value.communityId,
        communityName: this.communityForm.value.communityName,
        communityTitle: this.communityForm.value.communityTitle,
        tel: this.communityForm.value.tel,
        
      };
      this.editDataService.updateCommu(updatedCommunity).subscribe((response) => {
        console.log('response:', response);
        this.toastr.success('แก้ไขชุมชนสําเร็จ');
      });
      this.toggleModal('community');
    }
  }
   deleteCommu(commu: Community): void {
    const isConfirm = confirm('ยืนยันการลบ');
    if (!isConfirm) {
      return;
    }
    const deleteCommunity = {
      communityId: commu.communityId, 
    };
    this.editDataService.deleteCommu(deleteCommunity).subscribe((response) => {
      console.log('response:', response);
      this.toastr.success('ลบชุมชนสําเร็จ');
    });
   }

   updatePlace(): void {
    this.submitted = true; 
    if (this.placeForm) {
      const updatedPlace = {
        placeId: this.placeForm.value.placeId,
        placeName: this.placeForm.value.placeName,
        placeTitle: this.placeForm.value.placeTitle,
        placeGps: this.placeForm.value.placeGps,
        communityName: this.placeForm.value.communityName,
        tagName: this.placeForm.value.tagName
      };
      this.editDataService.updatePlace(updatedPlace).subscribe((response) => {
        console.log('response:', response);
        this.toastr.success('แก้ไขแหล่งท่องเที่ยวสําเร็จ');
      });
      this.toggleModal('place');
    }
  }
  deletePlace(place: Place): void {
    const isConfirm = confirm('ยืนยันการลบ');
    if (!isConfirm) {
      return;
    }
    const deletePlace = {
      placeId: place.placeId, 
    };
    this.editDataService.deletePlace(deletePlace).subscribe((response) => {
      console.log('response:', response);
      this.toastr.success('ลบแหล่งท่องเที่ยวสําเร็จ');
    });
  }

  updateFp(): void {
    this.submitted = true; 
    if (this.fpForm) {
      const updatedFp = {
        fpId: this.fpForm.value.fpId,
        fpName: this.fpForm.value.fpName,
        fpDetail: this.fpForm.value.fpDetail,
        communityName: this.fpForm.value.communityName,
        tagName: this.fpForm.value.tagName
      };
      this.editDataService.updateFp(updatedFp).subscribe((response) => {
        console.log('response:', response);
        this.toastr.success('แก้ไขสินค้าอาหารสําเร็จ');
      });
      this.toggleModal('fp');
    }
  }
  deleteFp(fp: FoodsProducts): void {
    const isConfirm = confirm('ยืนยันการลบ');
    if (!isConfirm) {
      return;
    }
    const deleteFp = {
      fpId: fp.fpId,
    };
    this.editDataService.deleteFp(deleteFp).subscribe((response) => {
      console.log('response:', response);
      this.toastr.success('ลบสินค้าอาหารสําเร็จ');
    });
  }

  updatePlan(): void {
    this.submitted = true; 
    if (this.planForm) {
      const updatedPlan = {
        planId: this.planForm.value.planId,
        planName: this.planForm.value.planName,
        planDetail: this.planForm.value.planDetail,
        communityName: this.planForm.value.communityName
      };
      this.editDataService.updatePlan(updatedPlan).subscribe((response) => {
        console.log('response:', response);
        this.toastr.success('แก้ไขแผนการท่องเที่ยวสําเร็จ');
      });
      this.toggleModal('plan');
    }
  }
  deletePlan(plan: Plan): void {
    const isConfirm = confirm('ยืนยันการลบ');
    if (!isConfirm) {
      return;
    }
    const deletePlan = {
      planId: plan.planId,
    };
    this.editDataService.deletePlan(deletePlan).subscribe((response) => {
      console.log('response:', response);
      this.toastr.success('ลบแผนการท่องเที่ยวสําเร็จ');
    });
  }

  updateEvent(): void {
    this.submitted = true; 
    if (this.eventForm) {
      const updatedEvent = {
        eventId: this.eventForm.value.eventId,
        eventName: this.eventForm.value.eventName,
        eventDetail: this.eventForm.value.eventDetail,
        communityName: this.eventForm.value.communityName,
        tagName: this.eventForm.value.tagName
      };
      this.editDataService.updateEvent(updatedEvent).subscribe((response) => {
        console.log('response:', response);
        this.toastr.success('แก้ไขกิจกรรมสําเร็จ');
      });
      this.toggleModal('event');
    }
  }
  deleteEvent(event: Event): void {
    const isConfirm = confirm('ยืนยันการลบ');
    if (!isConfirm) {
      return;
    }
    const deleteEvent = {
      eventId: event.eventId,
    };
    this.editDataService.deleteEvent(deleteEvent).subscribe((response) => {
      console.log('response:', response);
      this.toastr.success('ลบกิจกรรมสําเร็จ');
    });
  }

  updateNews(): void {
    this.submitted = true; 
    if (this.newsForm) {
      const updatedNews = {
        newsId: this.newsForm.value.newsId,
        newsName: this.newsForm.value.newsName,
        newsDetail: this.newsForm.value.newsDetail,
        communityName: this.newsForm.value.communityName
      };
      this.editDataService.updateNews(updatedNews).subscribe((response) => {
        console.log('response:', response);
        this.toastr.success('แก้ไขข่าวประชาสัมพันธ์สําเร็จ');
      });
      this.toggleModal('news');
    }
  }
  deleteNews(news: News): void {
    const isConfirm = confirm('ยืนยันการลบ');
    if (!isConfirm) {
      return;
    }
    const deleteNews = {
      newsId: news.newsId,
    };
    this.editDataService.deleteNews(deleteNews).subscribe((response) => {
      console.log('response:', response);
      this.toastr.success('ลบข่าวสําเร็จ');
    });
  }

  //FormBuild
  toggleModalCommu(commu: Community) {
    this.communityForm = this.formBuilder.group({
      communityId: commu.communityId,
      communityName: commu.communityName,
      communityTitle: commu.communityTitle,
      tel: commu.tel
    });
    this.toggleModal('community');
  }
  toggleModalPlace(place: Place) {
    this.placeForm = this.formBuilder.group({
      placeId: place.placeId,
      placeName: place.placeName,
      placeTitle: place.placeTitle,
      placeGps: place.placeGps,
      communityName: place.communityName,
      tagName: place.tagName
    });
    this.toggleModal('place');
  }

  toggleModalFp(fp: FoodsProducts) {
    this.fpForm = this.formBuilder.group({
      fpId: fp.fpId,
      fpName: fp.fpName,
      fpDetail: fp.fpDetail,
      communityName: fp.communityName,
      tagName: fp.tagName
    });
    this.toggleModal('fp');
  }

  toggleModalPlan(plan: Plan) {
    this.planForm = this.formBuilder.group({
      planId: plan.planId,
      planName: plan.planName,
      planDetail: plan.planDetail,
      communityName: plan.communityName
    });
    this.toggleModal('plan');
  }

  toggleModalEvent(event: Event) {
    this.eventForm = this.formBuilder.group({
      eventId: event.eventId,
      eventName: event.eventName,
      eventDetail: event.eventDetail,
      communityName: event.communityName,
      tagName: event.tagName
    });
    this.toggleModal('event');
  }

  toggleModalNews(news: News) {
    this.newsForm = this.formBuilder.group({
      newsId: news.newsId,
      newsName: news.newsName,
      newsDetail: news.newsDetail,
      communityName: news.communityName
    });
    this.toggleModal('news');
  }

  toggleModal(formName: string) {
    if (this.showForm === formName) {
      this.showForm = null;
    } else {
      this.showForm = formName;
    }
    
  }
  
  codeHidden(){
    this.isHidden = !this.isHidden;
  }
  toggleCard(cardName: string) {
    if (this.expandedCard === cardName) {
      this.expandedCard = null;
    } else {
      this.expandedCard = cardName;
    }


  }

}
