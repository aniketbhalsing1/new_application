import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm : FormGroup;
  loading : boolean = false;

  constructor(private fb: FormBuilder,  private authService: AuthService,
  private route: ActivatedRoute,
  private router: Router) { }

  ngOnInit() {
/*	this.signupForm = this.fb.group({
      firstName: '',
      middleName : '',
      lastName: '',
      mobileNo:'',
      userName : '',
      password:'',
      confirmPassword:''
    });	*/

    this.signupForm = new FormGroup({
        firstName: new FormControl('', [ Validators.required, Validators.minLength(3), Validators.maxLength(20) ]),
        middleName: new FormControl('', [ Validators.required, Validators.maxLength(20) ]),
        lastName: new FormControl('', [ Validators.required, Validators.maxLength(20) ]),
        mobileNo: new FormControl('', [ Validators.required, Validators.maxLength(10), Validators.maxLength(10) ]),
        emailId: new FormControl('', [ Validators.required, Validators.maxLength(10), Validators.maxLength(10) ]),
        userName: new FormControl('', [ Validators.required, Validators.minLength(10), Validators.maxLength(10) ]),
        password: new FormControl('', [ Validators.required, Validators.minLength(6), Validators.maxLength(15) ]),
        confirmPassword: new FormControl('',[ Validators.required, Validators.minLength(6), Validators.maxLength(15) ]),
    });
  }
/*Validators.pattern("[^ @]*@[^ @]*"),*/
  signUpUser(data){
    this.signupForm.value.registrationNo = "Dr/911233/dip";
  	console.log(this.signupForm.value)
    this.authService.signup(this.signupForm.value)
        .subscribe(
            data => this.router.navigate(['login']),
            error => this.loading = false
        );
    }

}
