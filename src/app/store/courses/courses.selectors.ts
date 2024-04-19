// Add your code here
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { coursesFeatureKey, CoursesState } from '@app/store/courses/courses.reducer';

export const selectCoursesState = createFeatureSelector<CoursesState>(coursesFeatureKey);

export const isAllCoursesLoadingSelector = createSelector(
    selectCoursesState,
    (state) => state.isAllCoursesLoading,
);

export const isSearchingStateSelector = createSelector(
    selectCoursesState,
    (state) => state.isSearchState,
);
export const isSingleCourseLoadingSelector = createSelector(
    selectCoursesState,
    (state) => state.isSingleCourseLoading,
);
export const getAllCourses = createSelector(
    selectCoursesState,
    (state) => state.allCourses,
);

export const getCourse = createSelector(
    selectCoursesState,
    (state) => state.course,
);

export const getCourses = createSelector(
    selectCoursesState,
    (state) => state.allCourses,
);

export const getErrorMessage = createSelector(
    selectCoursesState,
    (state) => state.errorMessage,
);
