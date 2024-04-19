import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { CoursesService } from './courses.service';
import { Course } from '@app/store/courses/courses.reducer';


@Injectable({
    providedIn: 'root'
})
export class CoursesStoreService {

    private isLoading$$ = new BehaviorSubject<boolean>(false);
    public isLoading$ = this.isLoading$$.asObservable();

    private courses$$ = new BehaviorSubject<Course[]>([]);
    public courses$ = this.courses$$.asObservable();

    constructor(private courseService: CoursesService) {

    }
    getAll(){
        console.log("Inside getAll store0");
        // Add your code here
        this.isLoading$$.next(true);
        return this.courseService.getAll().pipe(
            tap(courses => {
                this.courses$$.next(courses)
            }),
            tap(() => { this.isLoading$$.next(false) })
        );

    }

    createCourse(course: Course) { // replace 'any' with the required interface
        // Add your code here
        this.isLoading$$.next(true);
        return this.courseService.createCourse(course).pipe(
            tap(newCourse => {
                const courses = this.courses$$.value;
                this.courses$$.next([...courses, newCourse]);
            }),
            tap(() => { this.isLoading$$.next(false) })
        );
    }

    getCourse(id: string): Observable<Course> {
        // Add your code here
        return this.courseService.getCourse(id);
    }

    editCourse(id: string, course: Course) {// replace 'any' with the required interface
        // Add your code here
        this.isLoading$$.next(true);
        return this.courseService.editCourse(id, course).pipe(
            tap(editedCourse => {
                const courses = this.courses$$.value;
                const elementIndex = courses.findIndex(course => { id === course.id });
                if (elementIndex >= 0) {
                    courses[elementIndex] = editedCourse;
                    this.courses$$.next([...courses]);
                }
            }),
            tap(() => { this.isLoading$$.next(false) })
        );
    }

    deleteCourse(id: string) {
        // Add your code here
        this.isLoading$$.next(true);
        return this.courseService.deleteCourse(id).pipe(
            tap(() => {
                const courses = this.courses$$.value;
                this.courses$$.next(courses.filter(course => id !== course.id));
            }),
            tap(() => { this.isLoading$$.next(false) })
        );
    }

    filterCourses(value: string) {
        // Add your code here
        this.isLoading$$.next(true);
        return this.courseService.filterCourses(value).pipe(
            tap(courses => { this.courses$$.next(courses) }),
            tap(() => { this.isLoading$$.next(false) })
        );
    }

    getAllAuthors() {
        // Add your code here
        return this.courseService.getAllAuthors();
    }

    createAuthor(name: string) {
        // Add your code here
        return this.courseService.createAuthor(name);
    }

    getAuthorById(id: string) {
        // Add your code here
        return this.courseService.getAuthorById(id);
    }
}
