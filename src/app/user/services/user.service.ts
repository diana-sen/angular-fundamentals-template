import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { User, UserResponse } from '@app/app-interface';


@Injectable({
    providedIn: 'root'
})
export class UserService {
    private readonly apiUrl = 'http://localhost:4000';
    private usersUrl = '/users';

    constructor( private http: HttpClient){
    }

    getUser(): Observable<any> {
        // Add your code here
        return this.http.get<UserResponse>(`${this.apiUrl}${this.usersUrl}/me`)
            .pipe(map(response => {
                return response.result;
            }));
    }
}
