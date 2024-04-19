import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CoursesStoreService } from '@app/services/courses-store.service';
import { Course } from '@app/store/courses/courses.reducer';

import { faTrashCan, faPencil } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss'],
})
export class CoursesListComponent implements OnInit {
  @Input() courses: Course[]=[];
  @Input() editable: boolean = false;
  @Output() showCourse = new EventEmitter<void>();
  @Output() editCourse = new EventEmitter<void>();
  @Output() deleteCourse = new EventEmitter<void>();

  faTrashCan = faTrashCan;
  faPencil = faPencil;

  ngOnInit(): void {
    //console.log("courselist course" + this.courses[0].title);
  }

  handleShowCourse(event: any): void {
    this.showCourse.emit(event);
    console.log('navigate to course');
  }

  handleClickOnEdit(event:any){
    this.editCourse.emit(event);
  }

  handleClickOnDelete(event:any){
    this.deleteCourse.emit(event);
  }

}