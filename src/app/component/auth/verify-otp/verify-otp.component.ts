import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-verify-otp',
  templateUrl: './verify-otp.component.html',
  styleUrls: ['./verify-otp.component.css']
})
export class VerifyOtpComponent implements OnInit {


  verifyForm : FormGroup;
  stateParam : object;
  loading : boolean = false;

  constructor(private authService: AuthService,
              private route: ActivatedRoute,
              private router: Router) { 
              }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.verifyForm = new FormGroup({
        firstName: new FormControl(params.firstName),
        lastName: new FormControl(params.lastName),
        mobileNo: new FormControl(params.mobileNo),
        emailId: new FormControl(params.emailId),
        registrationNo: new FormControl(params.registrationNo),
        otp: new FormControl(params.otp)
    });
    });
  }

  verifyOTP(){
    this.authService.verifyOTP(this.verifyForm.value.otp)
      .subscribe(
          data => this.router.navigate(['login']),
          error => this.loading = false
      );
  }

  resendOTP(){
    this.authService.resendOTP(this.verifyForm.value.otp)
      .subscribe(
          data => data,
          error => console.log(error),
      );
  }  
}
