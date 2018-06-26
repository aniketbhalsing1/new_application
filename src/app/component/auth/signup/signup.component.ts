import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators, FormGroupDirective, NgForm } from '@angular/forms';
//import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router, NavigationExtras } from '@angular/router';
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
  'firstMiddleLastName': [
    { type: 'required', message: 'Name is required' },
    { type: 'minlength', message: 'Name must be at least 3 characters long' },
    { type: 'maxlength', message: 'Name cannot be more than 20 characters long' },
    { type: 'pattern', message: 'Please enter valid name' },
  ],
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
  ],
  'confirmPassword': [
    { type: 'required', message: 'Confirm password is required' },
    { type: 'minlength', message: 'Password must be at least 6 characters long' },
    { type: 'maxlength', message: 'Password cannot be more than 15 characters long' },      
    { type: 'areEqual', message: 'Password mismatch' }
  ],
  'mobileNo': [
    { type: 'required', message: 'Mobile number is required' },
    { type: 'minlength', message: 'Mobile number must be at least 10 characters long' },
    { type: 'maxlength', message: 'Mobile number cannot be more than 10 characters long' },
    { type: 'pattern', message: 'Please enter valid mobile number' },
  ],
  'registrationNo': [
    { type: 'required', message: 'Registration number is required' },
    { type: 'minlength', message: 'Registration number must be at least 7 characters long' },
    { type: 'maxlength', message: 'Registration number cannot be more than 30 characters long' },
    { type: 'pattern', message: 'Please enter valid registration number' },
  ]
}
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm : FormGroup;
  loading : boolean = false;
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  fmlNamepattern = "^[a-zA-Z_-]{3,15}$";
  pwdPattern = "^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{6,12}$";
//  mobnumPattern = "^((\\+91-?)|0)?[0-9]{10}$"; 
  mobnumPattern = "^[789]{1}[0-9]{9}$"; 
  
  validation_messages = validation_messages;
  matcher = new MyErrorStateMatcher();


  constructor(private authService: AuthService,
              private router: Router, public toastr: ToastsManager, vcr: ViewContainerRef) {
                //this.toastr.options = { positionClass: 'toast-top-center' };
                //this.toastr.options = { positionClass: 'toast-top-center', showCloseButton : true, animate : 'fade', dismiss : 'auto', newestOnTop : true,  enableHTML : true };
                
   
                // https://www.npmjs.com/package/ng2-toastr
                // https://github.com/PointInside/ng2-toastr/issues/155
                this.toastr.setRootViewContainerRef(vcr); 
              }

  ngOnInit() {
    this.signupForm = new FormGroup({
        firstName: new FormControl('', [ Validators.required, Validators.pattern(this.fmlNamepattern), Validators.minLength(3), Validators.maxLength(20) ]),
        lastName: new FormControl('', [ Validators.required, Validators.pattern(this.fmlNamepattern), Validators.minLength(3), Validators.maxLength(20) ]),
        mobileNo: new FormControl('', [ Validators.required, Validators.pattern(this.mobnumPattern), Validators.minLength(10), Validators.maxLength(10) ]),
        emailId: new FormControl('', [ Validators.required, Validators.pattern(this.emailPattern), Validators.minLength(10), Validators.maxLength(30) ]),
        registrationNo: new FormControl('', [ Validators.required, Validators.minLength(10), Validators.maxLength(10) ]),
        password: new FormControl('', [ Validators.required, Validators.minLength(6), Validators.maxLength(15) ]),
        confirmPassword: new FormControl('',[ Validators.required, Validators.minLength(6), Validators.maxLength(15) ]),
    }, (formGroup: FormGroup) => {
      return this.areEqual(formGroup);
   });
  }

  signUpUser(data){
    //if (!this.signupForm.valid) return this.validateAllFormFields(this.signupForm);    
    console.log(this.signupForm)
    this.authService.signup(this.signupForm.value)
        .subscribe(
            data => {
              let navigationExtras: NavigationExtras = {
                queryParams: this.signupForm.value
              };
              this.toastr.success('Registration successfull');
              this.router.navigate(['verifyOTP'], navigationExtras);
            },
            error => this.toastr.error(error.error.error[0].errorMessage)
    
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

    areEqual(formGroup: FormGroup) {
      let value;
      let valid = true;
      for (let key in formGroup.controls) {
        if (formGroup.controls.hasOwnProperty(key)) {
          let control: FormControl = <FormControl>formGroup.controls[key];
  
          if (value === undefined) {
            value = control.value
          } else {
            if (value !== control.value) {
              valid = false;
              break;
            }
          }
        }
      }
  
      if (valid) {
        return null;
      }
  
      return {
        areEqual: true
      };
    }

}
