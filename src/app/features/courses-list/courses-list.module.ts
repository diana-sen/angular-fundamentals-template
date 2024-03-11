import { NgModule } from "@angular/core";
import { CoursesListComponent } from "./courses-list.component";
import { SharedModule } from "@app/shared/shared.module";

@NgModule({
    imports:[SharedModule],
    declarations:[CoursesListComponent],
    bootstrap:[CoursesListComponent],
    exports:[CoursesListComponent],
})
export class CoursesListModule {
    
}