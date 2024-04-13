import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthorizedGuard implements CanLoad {
    // Add your code here
    constructor(private authService: AuthService, private router: Router){}

    canLoad(route: Route, segments: UrlSegment[]): boolean | UrlTree | Observable<boolean | UrlTree> {
       // return this.authService.isAuthorised ?? this.router.parseUrl(this.authService.getLoginUrl());
       return this.authService.isAuthorised ?? this.router.createUrlTree([this.authService.getLoginUrl()]);
    }
    
}
