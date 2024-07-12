
import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { ThemeOptions } from '../../theme-options';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
})
export class LayoutComponent{
 
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  constructor(private observer: BreakpointObserver,public global: ThemeOptions) {}

  // ขนาดที่ใช้ในการแบ่งโครงสร้าง
  ngOnInit() {
    this.observer.observe(['(max-width: 800px)']).subscribe((screenSize) => {
      if(screenSize.matches){
        this.global.isMobile = true;
      } else {
        this.global.isMobile = false;
      }
    });
  }

  // ปุ่มเมนู
  toggleMenu() {
    if(this.global.isMobile){
      this.sidenav.toggle();
      this.global.isCollapsed = false; //สำหรับมือถือ
    }else{
      this.sidenav.open();
      this.global.isCollapsed = !this.global.isCollapsed;//สำหรับวินโดว์
    }
    }
    isVisible = false;

    // ปุ่มผู้ใช้
    showBox() {
      this.isVisible = !this.isVisible;
    }
}




