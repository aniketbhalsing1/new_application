import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginObj: object = {};
  loading = false;
  returnUrl: string;

  constructor(
  private authService: AuthService,
  private route: ActivatedRoute,
  private router: Router) { }

  ngOnInit() {
          // reset login status
        this.authService.logout();

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  loginUser(data){
  	this.loading = true;
  	data = {
	    "deviceType": "Web",
	    "deviceId": "21356813646413",
	    "loginUsing": "EmailId",
	    "userType": "Doctor",
	    "userName": data.emailId,
	    "password": data.password
	}

    console.log(data)
    console.log(this.loginObj)
    this.authService.login(data)
        .subscribe(
            data => this.router.navigate([this.returnUrl]),
            error => this.loading = false
        );
    }

}
