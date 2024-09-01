import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ThemeOptions } from './theme-options';

// import { Observable } from 'rxjs';
// import { AppState } from './store/app.state';
// import { decrement, increment } from './store/counter.actions';

@Component({
  selector: 'app-root',
  // standalone: true,
  // imports: [RouterOutlet],

  templateUrl: './app.component.html',

})

export class AppComponent{
  title = 'projectjob';

  // constructor(
  //   public themeOptions: ThemeOptions,
  //   private renderer: Renderer2
  // ) { }

  // ngOnInit(): void {
  //   const body = document.body;
  //   this.updateTheme(body);
    
  //   const themeToggleBtn = document.getElementById('themeToggleBtn') as HTMLButtonElement;
  //   if (themeToggleBtn) {
  //     this.renderer.listen(themeToggleBtn, 'click', () => {
  //       this.themeOptions.toggleTheme();
  //       this.updateTheme(body);
  //     });
  //   }
  // }

  //   private updateTheme(body: HTMLElement): void {
  //     if (this.themeOptions.getThemeStatus()) {
  //       this.renderer.addClass(body, 'dark-theme');
  //       this.renderer.setProperty(document.getElementById('themeToggleBtn'), 'textContent', 'Switch to Light Theme');
  //     } else {
  //       this.renderer.removeClass(body, 'dark-theme');
  //       this.renderer.setProperty(document.getElementById('themeToggleBtn'), 'textContent', 'Switch to Dark Theme');
  //     }
  //   }

}
