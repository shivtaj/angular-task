import { Component, OnInit } from '@angular/core';
import { FormGroup , FormControl,Validators,FormGroupDirective} from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  fieldRequired: string = "This field is required"

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(){
    let emailregex: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    this.loginForm = new FormGroup(
      {
      'email': new FormControl(null,[Validators.required, Validators.pattern(emailregex)]),
      'password': new FormControl(null, [Validators.required, this.checkPassword]),
    }
    )
  }

  checkPassword(control: any) {
    let enteredPassword = control.value
    let passwordCheck = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})/;
    return (!passwordCheck.test(enteredPassword) && enteredPassword) ? { 'requirements': true } : null;
  }


  checkValidation(input: string){
    const validation = this.loginForm.get(input).invalid && (this.loginForm.get(input).dirty || this.loginForm.get(input).touched)
    return validation;
  }
  
  emailErrors() {
    return this.loginForm.get('email').hasError('required') ? 'This field is required' :
      this.loginForm.get('email').hasError('pattern') ? 'Not a valid emailaddress' :''
    }

  onSubmit(formData: FormGroup, formDirective: FormGroupDirective): void {
    const email = formData.value.email;
    const password = formData.value.password;
    this.auth.register(email, password);
    //  formDirective.resetForm();
    this.loginForm.reset();
  }

  getErrorPassword() {
    return this.loginForm.get('password').hasError('required') ? 'This field is required (The password must be at least six characters, one uppercase letter and one number)' :
      this.loginForm.get('password').hasError('requirements') ? 'Password needs to be at least six characters, one uppercase letter and one number' : '';
  }

}
