import { Component, OnInit } from '@angular/core';
import {
  FormBuilder, FormGroup, FormArray, Validators, FormControl
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Author } from '@app/app-interface';
import { Course } from '@app/store/courses/courses.reducer';
import { CoursesStoreService } from '@app/services/courses-store.service';
import { Subscription, map, tap } from 'rxjs';

import { ButtonConstants, IconNames } from '@app/app.constants';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss'],
})
export class CourseFormComponent implements OnInit {

  createAuthorText = ButtonConstants.BUTTON_CREATE_AUTHOR;
  buttonText = '';
  cancelText = ButtonConstants.BUTTON_CANCEL;
  addIcon = IconNames.ADD;
  deleteICon = IconNames.DELETE;
  courseForm!: FormGroup;
  courseId = '';

  private subscriptions: Subscription[] = [];

  // Use the names `title`, `description`, `author`, 'authors' (for authors list), `duration` for the form controls.
  
  constructor(public fb: FormBuilder, public library: FaIconLibrary, private activatedRoute: ActivatedRoute, private coursesStoreService: CoursesStoreService, private router: Router) {
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
    this.populateAuthors();
    const routeSubscription = this.activatedRoute.params.subscribe(params => this.courseId = params['id'])
    this.subscriptions.push(routeSubscription);
    if (!!this.courseId) { // Edit
      //let courseData: CourseData;
      this.populateCourse(this.courseId);
      this.buttonText = ButtonConstants.BUTTON_UPDATE_COURSE;
    } else {
      this.buttonText = ButtonConstants.BUTTON_CREATE_COURSE;
    }
  }
  private populateCourse(courseId: string) {
    const courseSubscription = this.coursesStoreService.getCourse(courseId).subscribe(

      courseData => {
        if (courseData) {
          this.courseForm.patchValue({ title: courseData.title });
          this.courseForm.patchValue({ description: courseData.description });
          this.courseForm.patchValue({ duration: courseData.duration });
          //Add authors
          courseData.authors.forEach(author => {
            const authorIndex = this.authors.value.findIndex((item: Author) => item.id === author);
            if (authorIndex >= 0) {
              this.moveAuthor(this.authors, this.courseAuthors, authorIndex);
            }
          });
        }
      });
    this.subscriptions.push(courseSubscription);
  }

  private populateAuthors() {
    const authorsSubscription = this.coursesStoreService.getAllAuthors().subscribe(
      authors => {
        authors.forEach(author => {
          const authorForm = this.fb.group({
            id: author.id,
            name: author.name,
          });

          this.authors.push(authorForm);
        });
      });

    this.subscriptions.push(authorsSubscription);
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
      this.coursesStoreService.createAuthor(this.courseForm.controls['author'].value).subscribe({
        next: author => {
          const authorForm = this.fb.group({
            id: author.id,
            name: author.name,
          });
          this.courseForm.patchValue({ author: "" });
          this.authors.push(authorForm);
        },
        error: err => console.log("Error adding author")
      });

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
    const author = origin.at(index);
    origin.removeAt(index);
    destination.push(author);
  }

  
  saveCourse() {
    if (this.courseForm.valid && this.courseAuthors.length > 0) {
      const authors = this.courseAuthors.controls.map(author => author.value.id);

      let course: Course = {
        title: this.courseForm.controls['title'].value,
        description: this.courseForm.controls['description'].value,
        duration: this.courseForm.controls['duration'].value,
        authors: authors
      }

      if (!!this.courseId) { // Update course
        console.log(course)
        const saveSubscription = this.coursesStoreService.editCourse(this.courseId, course).subscribe({
          next: res => { this.router.navigate(['/courses']); }
        });
        this.subscriptions.push(saveSubscription);
      } else { // Create course
        const saveSubscription = this.coursesStoreService.createCourse(course).subscribe({
          next: res => { this.router.navigate(['/courses']); }
        });
        this.subscriptions.push(saveSubscription);
      }

    } else {
      console.log("Invalid form data");
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
  
}
