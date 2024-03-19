import { Component } from '@angular/core';
import {
  FormBuilder, FormGroup, FormArray, Validators
} from '@angular/forms';
import { ButtonConstants } from '@app/app.constants';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss'],
})
export class CourseFormComponent {

  createAuthorText = ButtonConstants.BUTTON_CREATE_AUTHOR;
  createCourseText = ButtonConstants.BUTTON_CREATE_COURSE;
  cancelText = ButtonConstants.BUTTON_CANCEL;
  
  constructor(public fb: FormBuilder, public library: FaIconLibrary) {
    library.addIconPacks(fas);
    this.courseForm = this.fb.group({
      title: ['', Validators.compose([Validators.required, Validators.minLength(2)])],
      description: ['', Validators.compose([Validators.required, Validators.minLength(2)])],
      authors: this.fb.array([{
        name: [''],
      }]),
      duration: ['',  Validators.compose([Validators.required, Validators.min(0)])],
      newAuthor: this.fb.group({
        name:  Validators.compose([Validators.pattern('^[A-Za-z0-9]+$'), Validators.minLength(2)])
      }),
    });
  }
  courseForm!: FormGroup;
  // Use the names `title`, `description`, `author`, 'authors' (for authors list), `duration` for the form controls.

}
