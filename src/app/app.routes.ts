import { Routes } from '@angular/router';
import { AddComponent } from './Admin/add/add.component';
import { EditComponent } from './Admin/edit/edit.component';
import { PageLayoutComponent } from './Layout/page-layout/page-layout.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { HomeComponent } from './Page/home/home.component';
import { CommunityComponent } from './Page/community/community.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { DetailLayoutComponent } from './Layout/detail-layout/detail-layout.component';
import { LayoutComponent } from './Layout/layout/layout.component';
import { DetailComponent } from './LocalData/detail/detail.component';

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
            { path: 'add', component: AddComponent },
            { path: 'edit', component: EditComponent },
        ]
        
    },
    {
        path: '',
        component: DetailLayoutComponent,
        children:[
            { path: 'detail', component: DetailComponent },
        ]
    },
    {path: '**', redirectTo: ''}   
];
