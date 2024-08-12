import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeOptions {
  isMobile = true;
  isCollapsed = true;
  isDrop = true;
  isAdmin = false;
  isLogin = false;
}
