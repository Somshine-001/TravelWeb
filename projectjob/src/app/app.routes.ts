import { Routes } from '@angular/router';
import { AddComponent } from './Admin/add/add.component';
import { HomeComponent } from './home/home.component';
import { BaseLayoutComponent } from './Layout/base-layout/base-layout.component';
import { PageLayoutComponent } from './Layout/page-layout/page-layout.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';

export const routes: Routes = [
    {
        path: '',
        component: BaseLayoutComponent,
        children:[
            {path: '', redirectTo: 'home', pathMatch: 'full'},
            { path: 'home', component: HomeComponent },
        ]
    },
    {
        path: '',
        component: PageLayoutComponent,
        children:[
            { path: 'login', component: LoginPageComponent },
            { path: 'register', component: RegisterPageComponent },
            { path: 'add', component: AddComponent },
        ]
        
    },
    {path: '**', redirectTo: ''}   
];
