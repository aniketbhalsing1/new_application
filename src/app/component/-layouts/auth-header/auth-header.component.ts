import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-auth-header',
  templateUrl: './auth-header.component.html',
  styleUrls: ['./auth-header.component.css']
})
export class AuthHeaderComponent implements OnInit {
  loginTrue : boolean = true;
  signupTrue :boolean = false;
  constructor() { }

  ngOnInit() {
  }

}
