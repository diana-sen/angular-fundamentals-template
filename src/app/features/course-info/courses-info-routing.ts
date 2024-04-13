import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CourseInfoComponent } from "./course-info.component";
import { AuthorizedGuard } from "@app/auth/guards/authorized.guard";

const routes: Routes = [
    { 
        path: '', 
        component: CourseInfoComponent, 
        canLoad:[AuthorizedGuard] 
    },
]

@NgModule({
    imports:[RouterModule.forChild(routes)],
    exports:[RouterModule]
})

export class courseInfoRoutingModule { }
