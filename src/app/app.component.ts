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
export class AppComponent {
  title = 'courses-app';
  logoutText:string = ButtonConstants.BUTTON_LOGOUT;
}
