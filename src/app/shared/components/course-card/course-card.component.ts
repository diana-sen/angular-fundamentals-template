import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ButtonConstants } from '@app/app.constants';
import { CoursesStoreService } from '@app/services/courses-store.service';
import { Course } from '@app/store/courses/courses.reducer';
import { Subscription, forkJoin } from 'rxjs';
//import { faTrashCan, faPencil } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.scss'],
})
export class CourseCardComponent implements OnInit {
  @Input() editable = false;
  @Output() clickOnShow = new EventEmitter<string>();
  @Input() course: Course = {
    id: '', 
    title: '', 
    description: '', 
    creationDate: new Date(), 
    duration: 0, 
    authors: [] 
  };

  private subscriptions: Subscription[] = [];

  public showText = ButtonConstants.BUTTON_SHOW_COURSE;
  public authorsNames: string[] = [];

  constructor(private coursesStoreService: CoursesStoreService){
  }

  ngOnInit(): void {
    const authorObservables = this.course.authors?.map(authorId => {
      return this.coursesStoreService.getAuthorById(authorId);
    });

    if (authorObservables) {
      const authorsSubscription = forkJoin(authorObservables).subscribe({
        next: authors => { this.authorsNames = authors.map(author => author.name); },
        error: () => { console.log("Error!!!"); this.authorsNames.push('') }
      });
  
      this.subscriptions.push(authorsSubscription);
    } 
  }

  public handleClickOnShow(event: any): void{
    return this.clickOnShow.emit(this.course.id?.toString()); //test fix

  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

}