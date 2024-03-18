import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent {
  @ViewChild("loginForm") public loginForm!: NgForm;
  //Use the names `email` and `password` for form controls.

  email = '';
  password = '';

  onSubmit(loginItem: any): any {
    console.log("Login Data:");
    console.log(loginItem);
  }

  public emitSubmitEvent(event: any): void{
    this.loginForm.ngSubmit.emit();
  }
  
}
