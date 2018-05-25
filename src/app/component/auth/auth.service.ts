import { Injectable } from '@angular/core';
import { HttpClient, HttpHandler } from '@angular/common/http';
import 'rxjs/Rx'; 
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import { HttpService } from './../../services/http-services/http.service';

@Injectable()
export class AuthService {

  constructor(private http: HttpClient, private headers : HttpHandler, private httpService : HttpService) { }

  login(data) {
      return this.http.post<any>('http://dipz.ml/api/doctor/sign/in', data, {headers : {'Content-Type' : 'application/json'}})
          .map(user => {
              // login successful if there's a jwt token in the response
              if (user && user.token) {
                  // store user details and jwt token in local storage to keep user logged in between page refreshes
                  localStorage.setItem('currentUser', JSON.stringify(user));
              }   

              return user;
          });
  }

  signup(data) {
      return this.http.post<any>('http://dipz.ml/api/doctor/sign/up', data, {headers : {'Content-Type' : 'application/json'}})
          .map(user => {
              // login successful if there's a jwt token in the response
              if (user && user.token) {
                  // store user details and jwt token in local storage to keep user logged in between page refreshes
                  localStorage.setItem('currentUser', JSON.stringify(user));
              }   

              return user;
          });
  }

  /*login(data) {
    this.httpService.doPost('url',data, ()=> (resp : Response) =>  {return resp})
	};*/

	

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }

}
