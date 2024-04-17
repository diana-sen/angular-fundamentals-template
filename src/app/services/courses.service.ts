import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Author, CourseData } from '@app/app-interface';
import { Observable, map } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CoursesService {
    private readonly apiBaseUrl = 'http://localhost:4000';
    private readonly coursesPath = '/courses';
    private readonly authorsPath = '/authors';

    constructor(private http: HttpClient) {
    }

    getAll(): Observable<CourseData[]> {
        // Add your code here
        console.log("Get all courses - courses service")
        return this.http.get<CoursesResponse>(`${this.apiBaseUrl}${this.coursesPath}/all`).pipe(
            map(response => {
                return response.result.map(course => {
                    const courseData = {
                        id: course.id,
                        title: course.title,
                        description: course.description,
                        creationDate: this.convertDate(course.creationDate),
                        duration: course.duration,
                        authors: course.authors
                    };
                    return courseData;
                })

            })
        );
    }

    createCourse(course: CourseData): Observable<CourseData> {
        // Add your code here

        const body: Course = {
            title: course.title,
            description: course.description,
            duration: course.duration,
            authors: course.authors
        }

        return this.http.post<CourseResponse>(`${this.apiBaseUrl}${this.coursesPath}/add`, body).pipe(
            map(response => {
                const courseData = {
                    id: response.result.id,
                    title: response.result.title,
                    description: response.result.description,
                    creationDate: this.convertDate(response.result.creationDate),
                    duration: response.result.duration,
                    authors: response.result.authors
                }

                return courseData;

            })
        );
    }

    editCourse(id: string, course: CourseData): Observable<CourseData> {
        // Add your code here
        const body: Course = {
            title: course.title,
            description: course.description,
            duration: course.duration,
            authors: course.authors
        }

        return this.http.post<CourseResponse>(`${this.apiBaseUrl}${this.coursesPath}/"${id}"`, body).pipe(
            map(response => {
                return {
                    id: response.result.id,
                    title: response.result.title,
                    description: response.result.description,
                    creationDate: this.convertDate(response.result.creationDate),
                    duration: response.result.duration,
                    authors: response.result.authors
                }
            })
        );
    }


    getCourse(id: string): Observable<CourseData> {
        // Add your code here
        //const course = mockedCoursesList.find((course) => course.id === id);
        return this.http.get<CourseResponse>(`${this.apiBaseUrl}${this.coursesPath}/${id}`).pipe(
            map(response => {
                return {
                    id: response.result.id,
                    title: response.result.title,
                    description: response.result.description,
                    creationDate: this.convertDate(response.result.creationDate),
                    duration: response.result.duration,
                    authors: response.result.authors
                }
            })
        );
    }

    deleteCourse(id: string) {
        // Add your code here
        return this.http.delete(`${this.apiBaseUrl}${this.coursesPath}/${id}`);
    }

    filterCourses(value: string) {
        const filterQuery = value ? `?title=${value}` : '';

        // Add your code here
        return this.http.get<CoursesResponse>(`${this.apiBaseUrl}${this.coursesPath}/filter${filterQuery}`).pipe(
            map(response => {
                return response.result.map(course => {
                    const courseData = {
                        id: course.id,
                        title: course.title,
                        description: course.description,
                        creationDate: this.convertDate(course.creationDate),
                        duration: course.duration,
                        authors: course.authors
                    };
                    return courseData;
                })

            })
        );
    }

    getAllAuthors(): Observable<Author[]> {
        // Add your code here
        //return mockedAuthorsList;
        return this.http.get<AuthorsResponse>(`${this.apiBaseUrl}${this.authorsPath}/all`).pipe(
            map(response => response.result)
        );
    }

    createAuthor(name: string) {
        // Add your code here
        return this.http.post<CourseResponse>(`${this.apiBaseUrl}${this.authorsPath}/add`, { name }).pipe(
            map(response => response.result));
    }

    getAuthorById(id: string) {
        // Add your code here
        /* const author = this.getAllAuthors().find((author) => author.id === id);
        return author?.name;*/
        return this.http.get<AuthorResponse>(`${this.apiBaseUrl}${this.authorsPath}/${id}`).pipe(
            map(response => response.result)
        );
    }

    private convertDate(dateStr: string | undefined): Date {
        if (dateStr) {
            const dateSegments = dateStr.split('/');
            if (dateSegments?.length === 3) {
                return new Date(Number(dateSegments[2]), Number(dateSegments[1]) - 1, Number(dateSegments[0]));
            }
        }
        return new Date();
    }
}

//Interfaces

export interface Course {
    id?: string;
    title: string;
    description: string;
    creationDate?: string;
    duration: number;
    authors: string[];
}

export interface CourseResponse {
    successful: boolean;
    result: Course;
}

export interface CoursesResponse {
    successful: boolean;
    result: Course[];
}

export interface AuthorResponse {
    successful: boolean;
    result: Author;
}

export interface AuthorsResponse {
    successful: boolean;
    result: Author[];
}
