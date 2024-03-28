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
    private isAuthorized$$ = new BehaviorSubject<boolean>(false);
    public isAuthorized$ = new Observable<boolean>;

    constructor(private sessionStorage: SessionStorageService, private http: HttpClient){}

    login(user: User) { // replace 'any' with the required interface
        // Add your code here
        console.log('user is on auth service');
        return this.http.post<TokenResponse>(`http://localhost:4000/login`, {...user} )
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
        return this.http.post(`${this.apiUrl}/register`, user);
    }

    get isAuthorised() {
        // Add your code here. Get isAuthorized$$ value
        return this.isAuthorized$$.getValue();

    }

    set isAuthorised(value: boolean) {
        // Add your code here. Change isAuthorized$$ value
        this.isAuthorized$$.next(value);
    }

    getLoginUrl() {
        // Add your code here
    }
}
