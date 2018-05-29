import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router, NavigationExtras } from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm : FormGroup;
  loading : boolean = false;

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
        firstName: new FormControl('', [ Validators.required, Validators.minLength(3), Validators.maxLength(20) ]),
        lastName: new FormControl('', [ Validators.required, Validators.minLength(3), Validators.maxLength(20) ]),
        mobileNo: new FormControl('', [ Validators.required, Validators.maxLength(10), Validators.maxLength(10) ]),
        emailId: new FormControl('', [ Validators.required, Validators.maxLength(10), Validators.maxLength(10) ]),
        registrationNo: new FormControl('', [ Validators.required, Validators.maxLength(10), Validators.maxLength(10) ]),
        password: new FormControl('', [ Validators.required, Validators.minLength(6), Validators.maxLength(15) ]),
        confirmPassword: new FormControl('',[ Validators.required, Validators.minLength(6), Validators.maxLength(15) ]),
    });
  }

  signUpUser(data){
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

}
