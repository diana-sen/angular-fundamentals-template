import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { reducers, effects, State } from '..';
import * as CoursesSelectors from './courses.selectors';
import { Observable } from 'rxjs';
import { Course } from './courses.reducer';
import * as CoursesActions  from './courses.actions';


@Injectable({
    providedIn: 'root'
})
export class CoursesStateFacade {
    // Add your code here
    constructor(private store: Store<State>){}

    //public observable properties

    // isAllCoursesLoading$
    // isSingleCourseLoading$
    // isSearchingState$
    // courses$
    // course$
    // errorMessage$

    public allCourses$: Observable<Course[]> = this.store.pipe(select(CoursesSelectors.getAllCourses));

    getAllCourses(){
        this.store.dispatch(CoursesActions.requestAllCourses());
    }
}
