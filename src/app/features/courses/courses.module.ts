import { NgModule } from "@angular/core";
import { CoursesComponent } from "./courses.component";
import { SharedModule } from "@app/shared/shared.module";

@NgModule({
    imports:[SharedModule],
    declarations:[CoursesComponent],
    bootstrap:[CoursesComponent],
    exports:[CoursesComponent]
})
export class CourseModule {}