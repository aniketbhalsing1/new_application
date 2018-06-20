import { Injectable } from '@angular/core';
import { HttpClient, HttpHandler } from '@angular/common/http';
import 'rxjs/Rx'; 
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Data } from '@angular/router';
//import { HttpService } from './../../services/http-services/http.service';

@Injectable()
export class ProfileService {

  constructor(private http: HttpClient, private headers : HttpHandler) { }
  requestURL : string = 'http://curessia.info/api/';
  getDoctorPrsonalDetails() : Observable<Data> {
      return this.http.get<any>(this.requestURL+'dr/profile/personal')
          .map(user => {
              return user;
          });
  }

  getDoctorProfileStatus() : Observable<Data> {
	return this.http.get<any>(this.requestURL+'doctor/profile/status')
		.map(user => {
			return user;
		});
}

  savePersonalDetails(Data : any) : Observable<Data>{
		return this.http.post<any>(this.requestURL+'dr/profile/personal', Data)
			.map(user => {
					if (user && user.token) 
							localStorage.setItem('currentUser', JSON.stringify(user));
					return user;
			});
  }

	educationDetails() : Observable<Data> {
    return this.http.get<any>(this.requestURL+'doctor/degree')
        .map(user => {
            return user;
        });
 }
 
	getDegree() : Observable<Data> {
		return this.http.get<any>(this.requestURL+'dossier/lookup/{DossierType}')
				.map(user => {
						return user;
				});
	}

	getStates() : Observable<Data> {
		return this.http.get<any>(this.requestURL+'dossier/state')
				.map(user => {
						return user;
				});
	}

	getCity(stateId : any) : Observable<Data> {
		return this.http.get<any>(this.requestURL+'dossier/city/'+stateId)
				.map(user => {
						return user;
				});
	}

	getArea(cityId : any) : Observable<Data> {
		return this.http.get<any>(this.requestURL+'dossier/area/'+cityId)
				.map(user => {
						return user;
				});
	}

  saveEducationDetails(Data : any) : Observable<Data>{
    return this.http.post<any>(this.requestURL+'doctor/degree', Data)
        .map(data => {
                return data;
        });
	}

	deleteEducation(Data : any) : Observable<Data>{
    return this.http.delete<any>(this.requestURL+'doctor/degree/'+Data)
        .map(data => {
          return data;
        });
	}
}
