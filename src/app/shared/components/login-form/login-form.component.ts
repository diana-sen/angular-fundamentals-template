import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '@app/app-interface';
import { AuthService } from '@app/auth/services/auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent {
  @ViewChild("loginForm") public loginForm!: NgForm;
  //Use the names `email` and `password` for form controls.
  
  constructor(private authService: AuthService, private router: Router){}

  email = '';
  password = '';

  onSubmit(loginItem: User): any {
    this.authService.login(loginItem).subscribe(() => {
      this.router.navigate(['/courses'])});
      console.log("Login Data:");
      console.log(loginItem);
  }

  public emitSubmitEvent(event: any): void{
    this.loginForm.ngSubmit.emit();
  }

}
