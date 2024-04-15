import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { SessionStorageService } from '../services/session-storage.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    // Add your code here
    constructor(
        private sessionStorage: SessionStorageService, 
        private router: Router,
        private authService: AuthService
    
    ) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this.sessionStorage.getToken()?? '';
        let clonedHeaders = req.headers.set("authorization", token); 
        let authorizedRequest: HttpRequest<any> = token ? req.clone({headers: clonedHeaders }) : req;
        console.log("token interceptor");

        return next.handle(authorizedRequest).pipe(
            catchError((error) => {
                if (error.status === 401) {
                    this.router.navigate([this.authService.getLoginUrl]);
                }
                throw error;
            })



        )   
    }
}
