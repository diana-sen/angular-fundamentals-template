import { Injectable } from '@angular/core';
import { mockedCoursesList, mockedAuthorsList } from '@app/shared/mock/mock';

@Injectable({
    providedIn: 'root'
})
export class CoursesService {
    getAll() {
        // Add your code here
        return mockedCoursesList;
    }

    createCourse(course: any) { // replace 'any' with the required interface
        // Add your code here
    }

    editCourse(id: string, course: any) { // replace 'any' with the required interface
        // Add your code here
    }

    getCourse(id: string) {
        // Add your code here
        const course = mockedCoursesList.find((course) => course.id === id);
        return course;
    }

    deleteCourse(id: string) {
        // Add your code here
    }

    filterCourses(value: string) {
        // Add your code here
    }

    getAllAuthors() {
        // Add your code here
        return mockedAuthorsList;
    }

    createAuthor(name: string) {
        // Add your code here
    }

    getAuthorById(id: string) {
        // Add your code here
        const author = this.getAllAuthors().find((author) => author.id === id);
        return author?.name;
    }
}
