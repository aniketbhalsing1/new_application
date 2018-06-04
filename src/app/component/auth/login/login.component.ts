import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  //loginObj: object = {};
  loading = false;
  returnUrl: string;
  userName : string;
  password : string;

  constructor(
  private authService: AuthService,
  private route: ActivatedRoute,
  private router: Router) { }


    ngOnInit() {
        console.log("ngOnInIt")
    }

  loginUser(){
    this.loading = true;
    let data = {
      "deviceType": "Web",
      "deviceId": "21356813646413",
      "loginUsing": "EmailId",
      "userType": "Doctor",
      "userName": this.userName,
      "password": this.password
  }

    console.log(data)
    this.authService.login(data)
        .subscribe(
            data => this.router.navigate(['/profile']),
            error => this.loading = false
        );
    }

}
