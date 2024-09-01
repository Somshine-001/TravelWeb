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
  
  // private themeKey = 'isThemeLight';

  // constructor() {
  //   this.isThemeLight = this.getThemeFromStorage();
  // }

  // isThemeLight = false;

  // toggleTheme(): void {
  //   this.isThemeLight = !this.isThemeLight;
  //   localStorage.setItem(this.themeKey, this.isThemeLight.toString());
  // }

  // getThemeStatus(): boolean {
  //   return this.isThemeLight;
  // }

  // private getThemeFromStorage(): boolean {
  //   const savedTheme = localStorage.getItem(this.themeKey);
  //   return savedTheme === 'true';
  // }
}
