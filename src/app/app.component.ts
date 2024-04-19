import { Component, OnDestroy, OnInit } from '@angular/core';
import { ButtonConstants } from './app.constants';
import { faTrashCan, faPencil } from '@fortawesome/free-solid-svg-icons';
import { CourseData, User } from './app-interface';
import { CoursesService } from './services/courses.service';
import { CoursesStoreService } from './services/courses-store.service';
import { AuthService } from './auth/services/auth.service';
import { Router } from '@angular/router';
import { Observable, takeUntil } from 'rxjs';
import { SessionStorageService } from './auth/services/session-storage.service';
import { UserStoreService } from './user/services/user-store.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'courses-app';
  logoutText:string = ButtonConstants.BUTTON_LOGOUT;

  isAuthorised$!: Observable<boolean>;
  username$!: Observable<string>;


  constructor(    
    private authService: AuthService,
    private userStoreService: UserStoreService,
    private router: Router
  ) {
    this.isAuthorised$ = this.authService.isAuthorized$;
    this.username$ = this.userStoreService.name$;
  }

  ngOnInit(): void {
    this.userStoreService.getUser().subscribe({
      next: () => { this.authService.isAuthorised = true; },
      error: () => this.authService.isAuthorised = false
    }
    );
  }
  logout() {
    this.authService.logout().subscribe(()=>{
      this.authService.isAuthorised = false;
      this.router.navigate(['/courses']);
      console.log("logout, go to courses");
    });
  }

  login() {
      this.router.navigate(['/login']);
      console.log("go to login");
  }

  getButtonText(): string{
    return this.authService.isAuthorised ? ButtonConstants.BUTTON_LOGOUT : ButtonConstants.BUTTON_LOGIN;
  }


}
