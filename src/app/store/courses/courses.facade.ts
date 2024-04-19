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

    public allCourses$: Observable<Course[] | null> = this.store.pipe(select(CoursesSelectors.getAllCourses));
    public course$: Observable<Course | null> = this.store.pipe(select(CoursesSelectors.getCourse));

    // isAllCoursesLoading$
    // isSingleCourseLoading$
    // isSearchingState$
    // courses$
    // errorMessage$

    getAllCourses(){
        this.store.dispatch(CoursesActions.requestAllCourses());
    }

    getSingleCourse(id: string) {
        this.store.dispatch(CoursesActions.requestSingleCourse({id}));
    }


}
