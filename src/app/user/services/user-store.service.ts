import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UserStoreService {
    private name$$ = new BehaviorSubject<string>('');
    private isAdmin$$ = new BehaviorSubject<boolean>(false);

    public name$: Observable<string> = this.name$$.asObservable();
    public isAdmin$: Observable<boolean> = this.isAdmin$$.asObservable();
    
    constructor(private userService: UserService){}

    getUser() {
        // Add your code here
        this.userService.getUser()
          .subscribe({
            next: (response) => {
                console.log(response);
                if (response){
                    this.name$$.next(response.name);
                    this.isAdmin = response.role ==='admin';
                }
                else{
                    this.name$$.next('');
                }
            },
            error: (err) => { this.name$$.error(err) }
        });

    return this.name$;
    }

    get isAdmin() {
        // Add your code here. Get isAdmin$$ 
        return this.isAdmin$$.getValue();
    }

    set isAdmin(value: boolean) {
        // Add your code here. Change isAdmin$$ value
        this.isAdmin$$.next(value);
    }
}
