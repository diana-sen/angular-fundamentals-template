import { NgModule } from "@angular/core";
import { CoursesComponent } from "./courses.component";
import { SharedModule } from "@app/shared/shared.module";
import { CoursesListComponent } from "./courses-list/courses-list.component";
import { CoursesRoutingModule } from "./courses-routing.module";
import { CommonModule } from "@angular/common";

@NgModule({
    imports:[CommonModule, SharedModule, CoursesRoutingModule],
    declarations:[CoursesComponent, CoursesListComponent],
    bootstrap:[CoursesComponent],
    exports:[CoursesComponent]
})
export class CourseModule {}