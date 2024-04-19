import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonConstants } from '@app/app.constants';
import { CoursesStoreService } from '@app/services/courses-store.service';
import { CoursesService } from '@app/services/courses.service';
import { Course } from '@app/store/courses/courses.reducer';
import { Subscription, forkJoin } from 'rxjs';

@Component({
  selector: 'app-course-info',
  templateUrl: './course-info.component.html',
  styleUrls: ['./course-info.component.scss']
})
export class CourseInfoComponent implements OnInit {
  // Use the names for the input `course`.
  course: Course = { 
    id: '', 
    title: '', 
    description: '', 
    creationDate: new Date(), 
    duration: 0, 
    authors: [] 
  };

  authorsNames: string[] = [];
  
  private subscriptions: Subscription[] = [];

  @Input() courseId = '';
  backButton: string = '';

  constructor(private coursesStoreService: CoursesStoreService, private router: Router, private activatedRoute: ActivatedRoute) {
    //this.routeSubscription = this.activatedRoute.params.subscribe(params => this.courseId = params['id'])
  }

  ngOnInit(): void {

    if (!this.courseId) {
      const routeSubscription = this.activatedRoute.params.subscribe(params => this.courseId = params['id'])
      this.subscriptions.push(routeSubscription);
    }

    this.backButton = ButtonConstants.BUTTON_BACK;
    const itemSubscription = this.coursesStoreService.getCourse(this.courseId)
      .subscribe(course => {
        this.course = course;
        if (course.authors) {
          this.fillInAuthors(course.authors);
        }
      });
    this.subscriptions.push(itemSubscription);
  }

  private fillInAuthors(authorIds: string[]): void {
    const authorObservables = this.course.authors?.map(authorId => {
      return this.coursesStoreService.getAuthorById(authorId);
    });

    if(authorObservables){
      const authorsSubscription = forkJoin(authorObservables).subscribe({
        next: authors => { this.authorsNames = authors.map(author => author.name); },
        error: () => { console.log("Error!!!"); this.authorsNames.push('') }
      });
  
      this.subscriptions.push(authorsSubscription);
    }
    
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

}
