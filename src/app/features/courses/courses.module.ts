import { NgModule } from "@angular/core";
import { CoursesComponent } from "./courses.component";

@NgModule({
    imports:[],
    declarations:[CoursesComponent],
    bootstrap:[CoursesComponent],
    exports:[CoursesComponent]
})
export class CourseModule {}