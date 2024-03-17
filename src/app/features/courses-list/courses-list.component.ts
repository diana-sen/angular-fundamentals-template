import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CourseData } from '@app/app-interface';
import { faTrashCan, faPencil } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss'],
})
export class CoursesListComponent implements OnInit {
  @Input() courses: CourseData[]=[];
  @Input() editable: boolean = false;
  @Output() showCourse = new EventEmitter<void>();
  @Output() editCourse = new EventEmitter<void>();
  @Output() deleteCourse = new EventEmitter<void>();

  faTrashCan = faTrashCan;
  faPencil = faPencil;

  ngOnInit(): void {
    console.log("courselist course" +this.courses[0].title);
  }

  handleShowCourse(event: any): void {
    this.showCourse.emit(event);
  }

  handleClickOnEdit(){
    this.deleteCourse.emit();
    console.log("Click on edit");
  }

  handleClickOnDelete(){
    this.deleteCourse.emit();
    console.log("Click on delete");
  }
}