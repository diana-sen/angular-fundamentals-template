import { Injectable } from '@angular/core';
import { CoursesService } from '@app/services/courses.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import * as courseActions from "./courses.actions"
import { Course } from './courses.reducer';
import { Router } from '@angular/router';


@Injectable()
export class CoursesEffects {
    constructor(private actions$: Actions, private coursesService: CoursesService, private router: Router) {}

    // Add your code here

    getAll$ = createEffect(() =>
        this.actions$.pipe(
          ofType(courseActions.requestAllCourses),
          mergeMap(() =>{
            return this.coursesService.getAll().pipe(
                map((courses) => courseActions.requestAllCoursesSuccess({courses})),
                catchError((error)=> of(courseActions.requestAllCoursesFail({error})))
            )
          }
        )
      )
    );

    getSpecificCourse$ = createEffect(() =>
        this.actions$.pipe(
          ofType(courseActions.requestSingleCourse),
          mergeMap((action) =>{
            return this.coursesService.getCourse(action.id).pipe(
                map((course) => courseActions.requestSingleCourseSuccess ({course: course})),
                catchError((error)=> of(courseActions.requestSingleCourseFail({error})))
            )
          }
        )
      )
    );

    createCourse$ = createEffect(() =>
      this.actions$.pipe(
        ofType(courseActions.requestCreateCourse),
        mergeMap((action) =>{
          return this.coursesService.createCourse(action.course).pipe(
              map((course) => courseActions.requestCreateCourseSuccess ({course: course})),
              catchError((error)=> of(courseActions.requestCreateCourseFail({error})))
          )
        }
      )
    )
  );

    editCourse$ = createEffect(() =>
      this.actions$.pipe(
        ofType(courseActions.requestEditCourse),
        mergeMap((action) =>{
          return this.coursesService.editCourse(action.id, action.course).pipe(
              map((course) => courseActions.requestEditCourseSuccess ({course: course})),
              catchError((error)=> of(courseActions.requestEditCourseFail({error})))
          )
        }
      )
    )
  );

    deleteCourse$ = createEffect(() =>
      this.actions$.pipe(
        ofType(courseActions.requestDeleteCourse),
        mergeMap((action) =>{
          return this.coursesService.deleteCourse(action.id).pipe(
              map(() => courseActions.requestDeleteCourseSuccess),
              catchError((error)=> of(courseActions.requestDeleteCourseFail({error})))
          )
        }
      )
    )
  );

  redirectToTheCoursesPage$ = createEffect(() => 
    this.actions$.pipe(
      ofType(
            courseActions.requestCreateCourseSuccess, 
            courseActions.requestEditCourseSuccess, 
            courseActions.requestSingleCourseFail),
      tap(() => this.router.navigate(['/courses']))
      ), 
      { dispatch: false }
    );

}
