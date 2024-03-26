import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CourseData } from '@app/app-interface';
import { ButtonConstants } from '@app/app.constants';
import { CoursesService } from '@app/services/courses.service';
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
  selectedCourse = '';

  constructor(private coursesService: CoursesService, private router: Router){
    
  }

  ngOnInit(): void {
    this.courses = this.coursesService.getAll().map((course)=>{
      const courseData: CourseData = {
        id: course.id,
        title: course.title,
        description: course.description,
        creationDate: new Date (course.creationDate),
        duration: course.duration,
        authors: course.authors
      }
      return courseData
    });
    console.log(this.courses);
  }

  showCourse(event:any){
    console.log("show course:" + event);
    this.selectedCourse = event;
    this.router.navigate(['courses', event]);
  }

  editCourse(event:any){
    console.log("fire edit course event");
  }

  deleteCourse(event:any){
    console.log("fire delete course event");
  }

/*
  showCourse(event:any){
    console.log("show course:" + event);
    this.selectedCourse = event;
  }

  editCourse(event:any){
    console.log("fire edit course event");
  }

  deleteCourse(event:any){
    console.log("fire delete course event");
  }

*/
}
