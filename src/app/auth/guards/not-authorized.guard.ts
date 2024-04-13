import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, map } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
    providedIn: 'root'
})
export class NotAuthorizedGuard implements CanActivate {
    // Add your code here
    constructor(private authService: AuthService, private router: Router){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> {
       if (!this.authService.isAuthorised)
        {
            return true;
        } else {
            return this.router. createUrlTree([this.authService.getCoursesUrl()]);
        }
    }    
}
