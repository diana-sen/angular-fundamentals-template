import { Component, OnInit } from '@angular/core';
import {
  FormBuilder, FormGroup, FormArray, Validators, FormControl
} from '@angular/forms';
import { ButtonConstants, IconNames } from '@app/app.constants';
import { CoursesService } from '@app/services/courses.service';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss'],
})
export class CourseFormComponent implements OnInit {

  createAuthorText = ButtonConstants.BUTTON_CREATE_AUTHOR;
  createCourseText = ButtonConstants.BUTTON_CREATE_COURSE;
  cancelText = ButtonConstants.BUTTON_CANCEL;
  addIcon = IconNames.ADD;
  deleteICon = IconNames.DELETE;
  courseForm!: FormGroup;

  // Use the names `title`, `description`, `author`, 'authors' (for authors list), `duration` for the form controls.
  
  constructor(public fb: FormBuilder, public library: FaIconLibrary, private coursesService: CoursesService ) {
    library.addIconPacks(fas);
    this.courseForm = this.fb.group({
      title: ['', Validators.compose([Validators.required, Validators.minLength(2)])],
      description: ['', Validators.compose([Validators.required, Validators.minLength(2)])],
      duration: ['',  Validators.compose([Validators.required, Validators.min(0)])],
      
      author:['',Validators.compose([Validators.pattern(/^[A-Za-z0-9 ]+$/i), Validators.minLength(2)])],
      authors: this.fb.array([]),
      courseAuthors: this.fb.array([]),
    });
  }

 
  ngOnInit() {
    // TODO: Get course from API
    // TODO: Get all authors from API

    /*

      ngOnInit(): void {
    let authorsList = this.coursesService.getAllAuthors();
    let authorsForm = this.courseForm.get('authors') as FormArray;
    authorsList.forEach(author => {
      authorsForm?.push(new FormControl({
        id: author.id,
        name: author.name
      }));
    });
  }
    */
  }

  get authors(): FormArray {
    return this.courseForm.controls['authors'] as FormArray;
  }

  get courseAuthors(): FormArray {
    return this.courseForm.controls['courseAuthors'] as FormArray;
  }

  isAuthorValid(): boolean {
    return this.courseForm.controls['author'].value.length > 0 && this.courseForm.controls['author'].valid;
  }

  createAuthor(): void {
    if (this.isAuthorValid()) {
      console.log("Valid author");
      const authorForm = this.fb.group({
        id: 'authID',
        name: this.courseForm.controls['author'].value,
      });

      this.authors.push(authorForm);
      // TODO: Call API to add author
    }
  }

  addAuthorToCourse(authorIndex: number): void {

    this.moveAuthor(this.authors, this.courseAuthors, authorIndex);
  }

  deleteAuthorFromCourse(authorIndex: number): void {
    this.moveAuthor(this.courseAuthors, this.authors, authorIndex);
  }

  moveAuthor(origin: FormArray, destination: FormArray, index: number) {
    console.log(index);
    const author = origin.at(index);
    console.log(author);
    origin.removeAt(index);
    destination.push(author);
  }
  
}
