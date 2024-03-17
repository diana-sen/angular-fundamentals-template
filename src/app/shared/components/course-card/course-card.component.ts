import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CourseData } from '@app/app-interface';
import { ButtonConstants } from '@app/app.constants';
import { CoursesService } from '@app/services/courses.service';
//import { faTrashCan, faPencil } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.scss'],
})
export class CourseCardComponent implements OnInit {
  @Input() editable = false;
  @Output() clickOnShow = new EventEmitter<string>();
  @Input() course: CourseData = {
    id: '', 
    title: '', 
    description: '', 
    creationDate: new Date(), 
    duration: 0, 
    authors: [] 
  };


  public showText = ButtonConstants.BUTTON_SHOW_COURSE;
  public authorName: string[] = [];

  constructor(private coursesService: CoursesService){
  }

  ngOnInit(): void {
    console.log("course info: "+ this.course);
    this.authorName = this.course.authors.map((authorId) => this.coursesService.getAuthorById(authorId)?? '' );
  }


  public handleClickOnShow(event: any): void{
    return this.clickOnShow.emit(this.course.id);

  }

}