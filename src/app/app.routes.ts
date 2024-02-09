import { Routes } from '@angular/router';



export const routes: Routes = [
    {path:'login',loadComponent: ()=> import('./pages/login/login.component')},
    {path:'register',loadComponent: ()=> import('./pages/register/register.component').then(a=>a.RegisterComponent)},
    {path:'home',loadComponent: ()=> import('./pages/home/home.component').then(a=>a.HomeComponent)},
    {path:'course-form',loadComponent:()=> import('./pages/course-form/course-form.component').then(a=>a.CourseFormComponent)},
    {path:'course-list',loadComponent:()=> import('./pages/course-list/course-list.component').then(a=>a.CourseListComponent,),
    },
    {path:'edit-course',loadComponent:()=> import('./pages/edit-course/edit-course.component').then(a=>a.EditCourseComponent)},
    {path: '',loadComponent:()=>import('./pages/login/login.component')},
    {path: 'admin-login',loadComponent:()=>import('./pages/admin-login/admin-login.component').then(a=>a.AdminLoginComponent)},
    {path: '**', redirectTo: '/login', pathMatch: 'full'}
];
