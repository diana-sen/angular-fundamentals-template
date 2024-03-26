import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CourseData } from "@app/app-interface";
import { ButtonConstants } from '@app/app.constants';
import { CoursesService } from '@app/services/courses.service';

@Component({
  selector: 'app-course-info',
  templateUrl: './course-info.component.html',
  styleUrls: ['./course-info.component.scss']
})
export class CourseInfoComponent implements OnInit {
  // Use the names for the input `course`.
  course: CourseData = { 
    id: '', 
    title: '', 
    description: '', 
    creationDate: new Date(), 
    duration: 0, 
    authors: [] 
  };

  @Input() courseId = '';
  backButton: string = '';

  constructor(private coursesService: CoursesService, private router: Router){
  }

  ngOnInit(): void {
    console.log("course info id" + this.courseId);
    this.backButton = ButtonConstants.BUTTON_BACK;
    const item = this.coursesService.getCourse(this.courseId);
    if (item){
      this.course.id = item.id;
      this.course.title = item.title;
      this.course.description = item.description;
      this.course.creationDate = new Date(item.creationDate);
      this.course.duration = item.duration;
      this.course.authors = item.authors.map((authorId) => this.coursesService.getAuthorById(authorId) ?? '');
    }
  }
}
