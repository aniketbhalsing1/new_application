import { Injectable } from '@angular/core';
import { HttpClient, HttpHandler } from '@angular/common/http';
import 'rxjs/Rx'; 
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import { HttpService } from './../../services/http-services/http.service';
//import { HttpInterceptorService } from './../../http-interceptor.service';
import { error } from 'protractor';

@Injectable()
export class AuthService {

  constructor(private http: HttpClient, private headers : HttpHandler, private httpService : HttpService) { }

  login(data) {
    // , {headers : {'Content-Type' : 'application/json'}}
      return this.http.post<any>('http://dipz.ml/api/doctor/sign/in', data)
          .map(user => {
              if (user && user.token) 
                  localStorage.setItem('currentUser', JSON.stringify(user));
              return user;
          });
  }

    signup2<T>(body: any): Observable<T> {

        let a =  this.http.post<T>('http://dipz.ml/api/doctor/sign/up', body);
        return a;
    }
  signup<T>(body: any): Observable<T> {
      return this.http.post<any>('http://dipz.ml/api/doctor/sign/up', body)
          .map(response => {
              if (response && response.Authorization)
                  localStorage.setItem('Authorization', JSON.stringify(response.data.Authorization));

                  localStorage.setItem('Authorization', JSON.stringify(response.data.Authorization));
              return response;
          });
  }

  verifyOTP(data) {
      console.log(localStorage.getItem('Authorization'))
      // {headers : {'Content-Type' : 'application/json', 'Authorization' : localStorage.getItem('Authorization')}}
    return this.http.get<any>('http://dipz.ml/api/doctor/mobile/verify/'+ data)
        .map(data => {
            return data;
        });
  }

  resendOTP(data) {
    console.log(localStorage.getItem('Authorization'))
    return this.http.get<any>('http://dipz.ml/api/doctor/mobile/resend')
        .map(data => {
            if (data) {
                console.log(data)
            }
            return data;
        });
  }
}
