import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CoursesComponent } from "./courses.component";
import { AuthorizedGuard } from "@app/auth/guards/authorized.guard";
import { CourseFormComponent } from "@app/shared/components";
import { AdminGuard } from "@app/user/guards/admin.guard";

const routes: Routes = [
    {
    path: '',
    children: [
        {
            path: '', component: CoursesComponent,
            canLoad:[AuthorizedGuard] 
        },  
        {
            path: 'add', component: CourseFormComponent,
            canLoad:[AuthorizedGuard],
            canActivate: [AdminGuard] 
        },
        {
            path: 'edit/:id', component: CourseFormComponent,
            canLoad:[AuthorizedGuard],
            canActivate: [AdminGuard]
        },
        {
            path: ':id',
            loadChildren:() => import('../course-info/course-info.module').then(m => m.CourseInfoModule),
        },
    ]
  }
]

@NgModule({
    imports:[RouterModule.forChild(routes)],
    exports:[RouterModule]
})

export class CoursesRoutingModule { }