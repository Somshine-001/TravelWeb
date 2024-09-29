import { Component, Input, OnInit } from '@angular/core';
import { ThemeOptions } from '../../theme-options';
import { PermissionService } from '../../Service/permission.service';
import { AuthService } from '../../Service/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PublishService } from '../../Service/publish.service';
import { EditDataService } from '../../Service/editData.service';
import { Image } from '../../Service/editData.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
})
export class DetailComponent implements OnInit {

  header!: string;
  item: any;
  username: string | null = null;

  images: Image[] = [];

  constructor(
    public global: ThemeOptions,
    private permissionService: PermissionService,
    private publishService: PublishService,
    private route: ActivatedRoute,
    private editDataService: EditDataService
    ) { }

  ngOnInit(): void {
    this.editDataService.getAll<Image>('image').subscribe((images) => {
      this.images = images;
    })

    this.route.queryParams.subscribe(params => {
      this.header = params['header'];
      this.item = JSON.parse(params['item']);
    });

    this.username = this.permissionService.getName();
  }

  getHeaderName(header: string, item: any): any {
    switch (header) {
      case 'ชุมชน':
        return item.communityName;
      case 'แหล่งท่องเที่ยว':
        return item.placeName;
      case 'อาหารและผลิตภัณฑ์':
        return item.fpName;
      case 'แผนการท่องเที่ยว':
        return item.planName;
      case 'กิจกรรมสรรทนาการ':
        return item.activityName;
      case 'ข่าวประชาสัมพันธ์':
        return item.newsName;
    }
  }

  chooseImage() {}

  imagePublish(images: any): void {
    this.publishService.imagePublish(this.getHeaderName(this.header, this.item), images)
  }

}
