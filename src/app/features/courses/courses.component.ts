import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonConstants } from '@app/app.constants';
import { CoursesStoreService } from '@app/services/courses-store.service';
import { CoursesService } from '@app/services/courses.service';
import { Observable, startWith } from 'rxjs';
import { faTrashCan, faPencil } from '@fortawesome/free-solid-svg-icons';
import { UserStoreService } from '@app/user/services/user-store.service';
import { Course } from '@app/store/courses/courses.reducer';
import { CoursesStateFacade } from '@app/store/courses/courses.facade';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {
  faTrashCan = faTrashCan;
  faPencil = faPencil;
  addCourseText: string = ButtonConstants.BUTTON_ADD_COURSE;
  showText: string = ButtonConstants.BUTTON_SHOW_COURSE;
 // courses: CourseData[] = [];
  courses$: Observable<Course[]> = this.coursesFacade.allCourses$;
  isAdmin$: Observable<boolean>;
  
  selectedCourse = '';

  constructor(private coursesFacade: CoursesStateFacade , private coursesStoreService: CoursesStoreService, private router: Router,
    private userStoreService: UserStoreService
  ){
   // this.courses$ = this.coursesStoreService.courses$;
    this.isAdmin$ = this.userStoreService.isAdmin$;
  }

  ngOnInit(): void {    
    this.coursesFacade.getAllCourses();
    
    //this.coursesStoreService.getAll().subscribe();
  
  }

  showCourse(event:any){
    console.log("show course:" + event);
    this.selectedCourse = event;
    this.router.navigate(['courses', event]);
  }

  editCourse(courseId:any){
    console.log("fire edit course event" + event);
    this.router.navigateByUrl(`/courses/edit/${courseId}`);
    
  }

  deleteCourse(courseId:any){
    console.log("fire delete course event: " + courseId);
    this.coursesStoreService.deleteCourse(courseId).subscribe();
  }
}
