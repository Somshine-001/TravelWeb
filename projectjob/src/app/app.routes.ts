import { Routes } from '@angular/router';
import { AddComponent } from './Admin/add/add.component';
import { EditComponent } from './Admin/edit/edit.component';
import { BaseLayoutComponent } from './Layout/base-layout/base-layout.component';
import { PageLayoutComponent } from './Layout/page-layout/page-layout.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { HomeComponent } from './Page/home/home.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { CommunityComponent } from './Page/community/community.component';

export const routes: Routes = [
    {
        path: '',
        component: BaseLayoutComponent,
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
    {path: '**', redirectTo: ''}   
];
