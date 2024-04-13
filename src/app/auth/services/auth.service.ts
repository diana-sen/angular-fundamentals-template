import { Injectable } from '@angular/core';
import { SessionStorageService } from './session-storage.service';
import { TokenResponse, User } from '@app/app-interface';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, map } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private readonly apiUrl = 'http://localhost:4000';
    private loginUrl = '/login';
    private coursesUrl = '/courses';
    private isAuthorized$$ = new BehaviorSubject<boolean>(false);
    public isAuthorized$ = new Observable<boolean>;

    constructor(private sessionStorage: SessionStorageService, private http: HttpClient){
        this.isAuthorized$ = this.isAuthorized$$.asObservable();
    }

    login(user: User) { // replace 'any' with the required interface
        // Add your code here
        console.log('user is on auth service');
        return this.http.post<TokenResponse>(`${this.apiUrl}${this.loginUrl}`, {...user} )
        .pipe(map(res => { 
            console.log(res);
            if(res.successful) {
                this.sessionStorage.setToken(res.result);
                this.isAuthorised = true;
            }
    }))
    }

    logout() {
        // Add your code here
        return this.http.delete(`${this.apiUrl}/logout`)
        .pipe(map(() => {
            this.sessionStorage.deleteToken();
            this.isAuthorised = false;
        }));
    } 

    register(user: User) { // replace 'any' with the required interface
        // Add your code here
        return this.http.post<TokenResponse>(`${this.apiUrl}/register`, user)
        .pipe(map((res) => {
            console.log("User registered");
            res.successful;
        }));
    }

    get isAuthorised() {
        // Add your code here. Get isAuthorized$$ value
        return this.isAuthorized$$.getValue();

    }

    set isAuthorised(value: boolean) {
        // Add your code here. Change isAuthorized$$ value
        this.isAuthorized$$.next(value);
    }

    getLoginUrl():string {
        // Add your code here
        return this.loginUrl;
    }

    getCoursesUrl():string {
        return this.coursesUrl;
    }
}
