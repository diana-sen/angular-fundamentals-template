import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ButtonConstants } from '@app/app.constants';
//import { faTrashCan, faPencil } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.scss'],
})
export class CourseCardComponent {
  @Input() editable = false;
  @Output() clickOnShow = new EventEmitter<string>();
  @Input() course: any;


  /*public title: string;
  public description : string;
  public creationDate: Date;
  public duration: number;
  public authors: string[];
  */

  public showText = ButtonConstants.BUTTON_SHOW_COURSE;

  //faTrashCan = faTrashCan;
  //faPencil = faPencil;

 
  constructor(){
   /* this.title = this.course.title;
    this.description = course.description;
    this.creationDate = course.creationDate;
    this.duration = 0;
    this.authors = [];
    */
  }


  public handleClickOnShow(event: any): void{
    return this.clickOnShow.emit(event);

  }

}