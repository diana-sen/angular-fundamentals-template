import { NgModule } from "@angular/core";
import { CourseInfoComponent } from "./course-info.component";
import { SharedModule } from "@app/shared/shared.module";
import { courseInfoRoutingModule } from "./courses-info-routing";

@NgModule({
    imports:[SharedModule, courseInfoRoutingModule],
    declarations:[CourseInfoComponent],
    bootstrap:[CourseInfoComponent],
    exports:[CourseInfoComponent],
})
export class CourseInfoModule {}