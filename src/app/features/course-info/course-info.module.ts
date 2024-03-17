import { NgModule } from "@angular/core";
import { CourseInfoComponent } from "./course-info.component";
import { SharedModule } from "@app/shared/shared.module";


@NgModule({
    imports:[SharedModule],
    declarations:[CourseInfoComponent],
    bootstrap:[CourseInfoComponent],
    exports:[CourseInfoComponent],
})
export class CourseInfoModule {}