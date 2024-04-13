import { HtmlTagDefinition } from '@angular/compiler';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '@app/app-interface';
import { AuthService } from '@app/auth/services/auth.service';
import { emailValidator } from '@app/shared/directives/email.directive';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss'],
})
export class RegistrationFormComponent implements OnInit {
  registrationForm!: FormGroup;
  constructor(private authService: AuthService, public router: Router){}

  // Use the names `name`, `email`, `password` for the form controls.
  ngOnInit(): void {
    this.registrationForm = new FormGroup({
      name: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(6),
        Validators.pattern('[\\w\\-\\s\\/]+'),
      ])),
      email: new FormControl('', Validators.compose([ 
      Validators.required,
      emailValidator()])),
      password: new FormControl('', Validators.required)
    });
  }

  onSubmit(registrationItem: User): any {
    this.authService.register(registrationItem).subscribe(() => {
      this.router.navigate(['/login'])});    
      console.log("Registration Data: ");
      console.log(registrationItem);
  }
  
}
