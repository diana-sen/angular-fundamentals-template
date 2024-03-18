import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { emailValidator } from '@app/shared/directives/email.directive';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss'],
})
export class RegistrationFormComponent implements OnInit {
  registrationForm!: FormGroup;
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

  onSubmit(registrationItem: any): any {
    console.log("Registration Data: ");
    console.log(registrationItem);
    console.log("Go to login");
  }

  public emitSubmitEvent(event: any): void{
    //this.registrationForm..ngSubmit.emit();
  }

}
