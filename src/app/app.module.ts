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
import { AppComponent } from './app.component';
import { routes } from './app.routes';
import { AuthInterceptor } from './auth.interceptor';

import { MatDialogModule } from '@angular/material/dialog';
import { AddcardComponent } from './Admin/AddData/addcard.component';
import { AdminComponent } from './Admin/admin.component';
import { EditcardComponent } from './Admin/EditData/editcard.component';
import { EditformComponent } from './Admin/EditData/EditForm/editform.component';
import { ImageSelectionDialogComponent } from './Dialog/image-selection-dialog/image-selection-dialog.component';
import { DetailLayoutComponent } from './Layout/detail-layout/detail-layout.component';
import { FooterComponent } from './Layout/footer/footer.component';
import { LayoutComponent } from './Layout/layout/layout.component';
import { PageLayoutComponent } from './Layout/page-layout/page-layout.component';
import { DatalistComponent } from './LocalData/datalist/datalist.component';
import { DetailComponent } from './LocalData/detail/detail.component';
import { TripModalComponent } from './LocalData/trip-modal/trip-modal.component';
import { LoginPageComponent } from './Page/Auth/login-page/login-page.component';
import { RegisterPageComponent } from './Page/Auth/register-page/register-page.component';
import { CommunityComponent } from './Page/community/community.component';
import { HomeComponent } from './Page/home/home.component';

@NgModule({
  declarations: [
    //LAYOUT
    AppComponent,
    LayoutComponent,
    PageLayoutComponent,
    DetailLayoutComponent,
    FooterComponent,
    
    //PAGE
    HomeComponent,
    CommunityComponent,
    LoginPageComponent,
    RegisterPageComponent,
    AdminComponent,
    EditcardComponent,
    EditformComponent,
    AddcardComponent,
    DetailComponent,
    DatalistComponent,
    TripModalComponent,

    // DIALOG
    ImageSelectionDialogComponent,

  ],
  imports: [
    CommonModule,
    BrowserModule,
    MatDialogModule,
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