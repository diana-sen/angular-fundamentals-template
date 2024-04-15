import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CourseData } from '@app/app-interface';
import { ButtonConstants } from '@app/app.constants';
import { CoursesStoreService } from '@app/services/courses-store.service';
import { CoursesService } from '@app/services/courses.service';
import { Observable, startWith } from 'rxjs';
import { faTrashCan, faPencil } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {
  faTrashCan = faTrashCan;
  faPencil = faPencil;
  
  showText:string = ButtonConstants.BUTTON_SHOW_COURSE;
  courses: CourseData[] = [];
  courses$: Observable<CourseData[]>;
  selectedCourse = '';

  constructor(private coursesStoreService: CoursesStoreService, private router: Router){
    this.courses$ = this.coursesStoreService.courses$;
  }

  ngOnInit(): void {    
    this.coursesStoreService.getAll().subscribe();
    console.log(this.courses);
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
