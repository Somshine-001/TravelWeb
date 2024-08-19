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

import { ToastrModule } from 'ngx-toastr';
import { AddComponent } from './Admin/add/add.component';
import { EditComponent } from './Admin/edit/edit.component';
import { AppComponent } from './app.component';
import { routes } from './app.routes';
import { AuthInterceptor } from './auth.interceptor';

import { AddcardComponent } from './Element/addElement/addcard/addcard.component';
import { EditcardComponent } from './Element/editElement/editcard/editcard.component';
import { EditformComponent } from './Element/editElement/editform/editform.component';
import { PageLayoutformComponent } from './Element/pageLayoutElement/page-layoutform/page-layoutform.component';
import { BaseLayoutComponent } from './Layout/base-layout/base-layout.component';
import { LayoutComponent } from './Layout/layout/layout.component';
import { PageLayoutComponent } from './Layout/page-layout/page-layout.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { HomeComponent } from './Page/home/home.component';
import { RegisterPageComponent } from './register-page/register-page.component';




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
    EditcardComponent,
    EditformComponent,
    AddcardComponent,
    PageLayoutformComponent,

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
      toastClass: 'toast-custom',
      positionClass: 'toast-top-center'
    }),
    RouterModule .forRoot(routes),
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
// { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }