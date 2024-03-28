import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { LoginFormComponent, RegistrationFormComponent, CourseFormComponent } from "./components";

const routes: Routes = [
    { path: 'login', component: LoginFormComponent },
    { path: 'registration', component: RegistrationFormComponent },
    { path: 'courses/add', component: CourseFormComponent },
    { path: 'courses/edit/:id', component: CourseFormComponent},
    {
      path:'',
      redirectTo:'courses',
      pathMatch:'full'
    }
  ];


@NgModule({
    imports:[RouterModule.forChild(routes)],
    exports:[RouterModule]
})

export class SharedRoutingModule { }