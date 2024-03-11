import { Component, Input } from '@angular/core';
import { ButtonConstants } from '@app/app.constants';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent {
// Use the names `title` and `text`.
@Input() Title = 'Your List is Empty';
@Input() Text = 'Please use ´Add New Course´ button to add your first course';

buttonText:string = ButtonConstants.BUTTON_ADD_COURSE;

public addCourse():void {
  console.log("adding a course");
}
}


