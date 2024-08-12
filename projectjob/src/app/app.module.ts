import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenu } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { QuillModule } from 'ngx-quill';

import { AddComponent } from './Admin/add/add.component';
import { AppComponent } from './app.component';
import { routes } from './app.routes';
import { HomeComponent } from './home/home.component';
import { BaseLayoutComponent } from './Layout/base-layout/base-layout.component';
import { LayoutComponent } from './Layout/layout/layout.component';
import { PageLayoutComponent } from './Layout/page-layout/page-layout.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { ToastrModule } from 'ngx-toastr';
import { RegisterPageComponent } from './register-page/register-page.component';
import { AuthInterceptor } from './auth.interceptor';
import { QuillEditorComponent } from 'ngx-quill'
import { EditComponent } from './Admin/edit/edit.component';
import { CardComponent } from './Element/card/card.component';




@NgModule({
  declarations: [
    //LAYOUT
    AppComponent,
    LayoutComponent,
    PageLayoutComponent,
    BaseLayoutComponent,
    


    //PAGE
    HomeComponent,
    LoginPageComponent,
    RegisterPageComponent,
    AddComponent,
    EditComponent,
    CardComponent,

  ],
  imports: [
    CommonModule,
    BrowserModule,
    MatIconModule,
    MatMenu,
    MatButtonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    ReactiveFormsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    QuillModule.forRoot({
      modules: {
        toolbar: [
          [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
          ['bold', 'italic', 'underline', 'strike'],
          [{ 'list': 'ordered' }, { 'list': 'bullet' }],
          ['blockquote', 'code-block'], 
          ['link'], 
          ['clean'] 
        ],
      }
    }),
    ToastrModule.forRoot({
      timeOut: 2000,
      preventDuplicates: true,
      positionClass: 'toast-custom'
    }),
    RouterModule .forRoot(routes),
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
// { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }