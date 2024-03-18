import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SharedModule } from '@shared/shared.module';
import { AppComponent } from '@app/app.component';
import { CourseInfoComponent } from '@features/course-info/course-info.component';
import { NotAuthorizedGuard } from '@app/auth/guards/not-authorized.guard';
import { AuthorizedGuard } from '@app/auth/guards/authorized.guard';
import { CoursesStoreService } from '@app/services/courses-store.service';
import { CoursesService } from '@app/services/courses.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CourseModule } from './features/courses/courses.module';
import { CoursesListModule } from './features/courses-list/courses-list.module';
import { CourseInfoModule } from './features/course-info/course-info.module';
import { CoursesListComponent } from './features/courses-list/courses-list.component';
//import { CustomDatePipe } from './shared/pipes/custom-date.pipe';

@NgModule({
  declarations: [AppComponent /*CustomDatePipe, CourseInfoComponent*/],
  imports: [
    BrowserModule,
    SharedModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    CourseModule,
    CoursesListModule,
    CourseInfoModule
  ],
  providers: [AuthorizedGuard, NotAuthorizedGuard, CoursesService, CoursesStoreService],
  bootstrap: [AppComponent],
})
export class AppModule {}
