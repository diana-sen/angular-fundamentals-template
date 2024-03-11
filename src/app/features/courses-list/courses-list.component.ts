import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CoursesService } from '@app/services/courses.service';
import { faTrashCan, faPencil } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss']
})
export class CoursesListComponent {
  @Input() courses = {};
  @Input() editable = false;
  @Output() showCourse = new EventEmitter<void>();
  @Output() editCourse = new EventEmitter<void>();
  @Output() deleteCourse = new EventEmitter<void>();

  faTrashCan = faTrashCan;
  faPencil = faPencil;

  handleShowCourse(){
    
    this.showCourse.emit()

  }
}