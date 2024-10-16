import { Routes } from '@angular/router';
import { AdminComponent } from './Admin/admin.component';
import { DetailLayoutComponent } from './Layout/detail-layout/detail-layout.component';
import { LayoutComponent } from './Layout/layout/layout.component';
import { PageLayoutComponent } from './Layout/page-layout/page-layout.component';
import { DetailComponent } from './LocalData/detail/detail.component';
import { DatalistComponent } from './LocalData/datalist/datalist.component';
import { LoginPageComponent } from './Page/Auth/login-page/login-page.component';
import { RegisterPageComponent } from './Page/Auth/register-page/register-page.component';
import { CommunityComponent } from './Page/community/community.component';
import { HomeComponent } from './Page/home/home.component';

export const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children:[
            {path: '', redirectTo: 'home', pathMatch: 'full'},
            { path: 'home', component: HomeComponent },
            { path: 'community', component: CommunityComponent},
        ]
    },
    {
        path: '',
        component: PageLayoutComponent,
        children:[
            { path: 'login', component: LoginPageComponent },
            { path: 'register', component: RegisterPageComponent },
            { path: 'admin', component: AdminComponent },
        ]
        
    },
    {
        path: '',
        component: DetailLayoutComponent,
        children:[
            { path: 'detail', component: DetailComponent },
            { path: 'deta-list', component: DatalistComponent },
        ]
    },
    {path: '**', redirectTo: ''}   
];
