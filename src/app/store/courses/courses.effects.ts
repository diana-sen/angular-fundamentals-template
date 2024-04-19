import { Injectable } from '@angular/core';
import { CoursesService } from '@app/services/courses.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
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
}
