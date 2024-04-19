import { Action, createReducer, on } from '@ngrx/store';
import * as CoursesActions from "./courses.actions";
import { Author } from '@app/app-interface';

// Add your code here

export const coursesFeatureKey = 'courses';

export interface Course {
  id?: string | number; //test fix
  title?: string; //test fix
  description?: string;
  creationDate?: string | Date;
  duration?: number;
  authors?: string[];
}

export interface CoursesState {
    // Add your code here
    allCourses: Course [] | null;
    course: Course | null;
    isAllCoursesLoading: boolean;
    isSingleCourseLoading: boolean;
    isSearchState: boolean;
    errorMessage: string | null | Error
    //authors: Author[]; //test fix
}

export const initialState: CoursesState = {
    // Add your code 
    allCourses: [],
    //authors: [],
    course: null, 
    isAllCoursesLoading: false,
    isSingleCourseLoading: false,
    isSearchState: false,
    errorMessage: ''
};

 // Add your code 
export const coursesReducer = createReducer(
    initialState,
    on(CoursesActions.requestAllCourses, (state) => ({ 
      ...state,
      isAllCoursesLoading: true,
      isSearchState: false,
      errorMessage: ''
    })),
    on(CoursesActions.requestAllCoursesSuccess, (state, { courses }) => ({
      ...state,
      allCourses: courses,
      isAllCoursesLoading: false,
      isSearchState: false
    })),
    on(CoursesActions.requestAllCoursesFail, (state, { error }) => ({
      ...state,
      allCourses: [],
      errorMessage: error,
      isAllCoursesLoading: false,
      isSearchState: false
    })),
    on(CoursesActions.requestSingleCourse, (state) => ({ 
      ...state,
      isSingleCourseLoading: true,
      isSearchState: false,
      errorMessage: ''
    })),
    on(CoursesActions.requestSingleCourseSuccess, (state, { course }) => ({
      ...state,
      course: course,
      isAllCoursesLoading: false,
      isSingleCourseLoading: false,
    })),
    on(CoursesActions.requestSingleCourseFail, (state, { error }) => ({
      ...state,
      course: null,
      errorMessage: error,
      isSingleCourseLoading: false,
    })),
    on(CoursesActions.requestFilteredCourses, (state) => ({ 
      ...state,
      isAllCoursesLoading: true,
      isSingleCourseLoading: false,
      isSearchState: true,
      errorMessage: ''
    })),
    on(CoursesActions.requestFilteredCoursesSuccess, (state, { courses }) => ({
      ...state,
      allCourses: courses,
      isAllCoursesLoading: false,
      isSingleCourseLoading: false,
      isSearchState: false
    })),
    on(CoursesActions.requestFilteredCoursesFail, (state, { error }) => ({
      ...state,
      allCourses: [],
      errorMessage: error,
      isSingleCourseLoading: false,
      isSearchState: false
    })),
    on(CoursesActions.requestDeleteCourse, (state) => ({ 
      ...state,
      isAllCoursesLoading: false,
      isSingleCourseLoading: false,
      errorMessage: ''
    })),
    on(CoursesActions.requestDeleteCourseSuccess, (state) => ({ 
      ...state,
      isAllCoursesLoading: false,
      isSingleCourseLoading: false,
    })),
    on(CoursesActions.requestDeleteCourseFail, (state, { error }) => ({
      ...state,
      errorMessage: error,
      isAllCoursesLoading: false,
      isSearchState: false
    })),
    on(CoursesActions.requestEditCourse, (state) => ({ 
      ...state,
      isAllCoursesLoading: false,
      errorMessage: ''
    })),
    on(CoursesActions.requestEditCourseSuccess, (state, { course }) => ({
      ...state,
      course: course,
      isAllCoursesLoading: false,
    })),
    on(CoursesActions.requestEditCourseFail, (state, { error }) => ({
      ...state,
      course: null,
      errorMessage: error,
    })),
    on(CoursesActions.requestCreateCourse, (state) => ({ 
      ...state,
      isSingleCourseLoading: true,
      errorMessage: ''
    })),
    on(CoursesActions.requestCreateCourseSuccess, (state, { course }) => ({
      ...state,
      course: course,
      isSingleCourseLoading: false,
      isSearchState: false
    })),
    on(CoursesActions.requestCreateCourseFail, (state, { error }) => ({
      ...state,
      course: null,
      errorMessage: error,
      isSingleCourseLoading: false,
    }))
);

export const reducer = (state: CoursesState, action: Action): CoursesState => coursesReducer(state, action);
