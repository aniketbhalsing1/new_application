import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormBuilder, FormGroup, Validators, FormGroupDirective, NgForm } from '@angular/forms';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import {ErrorStateMatcher} from '@angular/material/core';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

var validation_messages = {
  'email': [
    { type: 'required', message: 'Email Id is required' },
    { type: 'minlength', message: 'Email Id must be at least 7 characters long' },
    { type: 'maxlength', message: 'Email Id cannot be more than 30 characters long' },
    { type: 'pattern', message: 'Please enter valid email id' },
  ],
  'password': [
    { type: 'required', message: 'Password is required' },
    { type: 'minlength', message: 'Password must be at least 6 characters long' },
    { type: 'maxlength', message: 'Password cannot be more than 15 characters long' },      
    { type: 'pattern', message: 'Your password must contain at least one uppercase, one lowercase, and one number' }
  ]
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm : FormGroup;
  loading = false;
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  

  validation_messages = validation_messages;

  matcher = new MyErrorStateMatcher();
  
  constructor(
  private authService: AuthService,
  private route: ActivatedRoute,
  private router: Router, private fb: FormBuilder,public toastr: ToastsManager, vcr: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vcr);  
  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      userName: ['', [ Validators.required, Validators.pattern(this.emailPattern), Validators.minLength(7), Validators.maxLength(30)]],
      password: ['', [ Validators.required, Validators.minLength(6), Validators.maxLength(15) ]] 
    })
    // this.loginForm = new FormGroup({
    //   userName: new FormControl('', [ Validators.required, Validators.minLength(7), Validators.maxLength(30) ]),
    //   password: new FormControl('', [ Validators.required, Validators.minLength(6), Validators.maxLength(15) ]) 
    // });
  }

  loginUser(form){
    if (!this.loginForm.valid) return this.validateAllFormFields(this.loginForm);
    this.loading = true;
    let data = {
      "deviceType": "Web",
      "deviceId": "21356813646413",
      "loginUsing": "EmailId",
      "userType": "Doctor",
      "userName": form.value.userName,
      "password": form.value.password
  }

    console.log(data)
    this.authService.login(data)
        .subscribe(
            data => {
              this.toastr.success('User logged in successfull');
              this.router.navigate(['profile/profileStatus']);
            },
            error => {
              this.loading = false;
              this.toastr.error(error.error.error[0].errorMessage);
            }
        );
    }

    validateAllFormFields(formGroup: FormGroup) {         
      Object.keys(formGroup.controls).forEach(field => {  
        const control = formGroup.get(field);             
        if (control instanceof FormControl) {             
          control.markAsTouched({ onlySelf: true });
        } else if (control instanceof FormGroup) {        
          this.validateAllFormFields(control);            
        }
      });
    }

}
