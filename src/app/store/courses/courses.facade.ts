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
    
    public isAllCoursesLoading$: Observable<boolean> = this.store.pipe(select(CoursesSelectors.isAllCoursesLoadingSelector));
    public isSingleCourseLoading$: Observable<boolean> = this.store.pipe(select(CoursesSelectors.isSingleCourseLoadingSelector));
    public isSearchingState$: Observable<boolean> = this.store.pipe(select(CoursesSelectors.isSearchingStateSelector));
    public errorMessage$: Observable<string | Error | null> = this.store.pipe(select(CoursesSelectors.getErrorMessage));

    public courses$: Observable<Course[] | null> = this.store.pipe(select(CoursesSelectors.getCourses));

    getAllCourses(){
        this.store.dispatch(CoursesActions.requestAllCourses());
    }

    getSingleCourse(id: string) {
        this.store.dispatch(CoursesActions.requestSingleCourse({id}));
    }

    createCourse(course:Course) {
        this.store.dispatch(CoursesActions.requestCreateCourse({course: course}));
    } 

    editCourse(course:Course, id: string) { //test fix
        this.store.dispatch(CoursesActions.requestEditCourse({id, course}))
    } 

    getFilteredCourses(searchValue: string) {
        this.store.dispatch(CoursesActions.requestFilteredCourses({title: searchValue}));
    }

    deleteCourse(id: string) {
        this.store.dispatch(CoursesActions.requestDeleteCourse({id}));
    }
}
