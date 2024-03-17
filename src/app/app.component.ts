import { Component, OnInit } from '@angular/core';
import { ButtonConstants } from './app.constants';
import { faTrashCan, faPencil } from '@fortawesome/free-solid-svg-icons';
import { CourseData } from './app-interface';
import { CoursesService } from './services/courses.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'courses-app';
  logoutText:string = ButtonConstants.BUTTON_LOGOUT;
  showText:string = ButtonConstants.BUTTON_SHOW_COURSE;
  faTrashCan = faTrashCan;
  faPencil = faPencil;
  courses: CourseData[] = [];
  selectedCourse = '';
  constructor(private coursesService: CoursesService){
    
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
  }

  editCourse(event:any){
    console.log("fire edit course event");
  }

  deleteCourse(event:any){
    console.log("fire delete course event");
  }

}
