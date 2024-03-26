import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CoursesComponent } from './features/courses/courses.component';
import { CourseInfoComponent } from './features/course-info/course-info.component';

export const routes: Routes = [
    /* Add your code here */
    { 
        path: 'courses', 
        loadChildren:() => import('./features/courses/courses.module').then(m => m.CourseModule)  
    }, 
    { 
        path: 'courses/:id', 
        loadChildren:() => import('./features/course-info/course-info.module').then(m => m.CourseInfoModule) 
    },
    { 
        path: '', 
        loadChildren:() => import('./shared/shared.module').then(m => m.SharedModule) 
    },
    /*{ 
        //default
        path: '', 
        redirectTo: 'courses', 
        pathMatch:'full'
      
    },*/
    {   //fallback
        path: '**', 
        redirectTo:'courses',
    },
];

export const appRouting = RouterModule.forRoot(routes);