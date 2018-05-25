import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class HttpService {

  constructor(private http: HttpClient) { }
  //headers = new Headers({ 'Content-Type': 'application/json' });
//  this._baseURL = patientConstant.local.humanoCareServer,
  doGet = function (url, cbHttpFun) {
	  url = this._baseURL + url;
    this.http.get(url).
			success(function(data, status, headers, config) {
  		return cbHttpFun(data,null);
		}).
		error(function(data, status, headers, config) {
  		return cbHttpFun(null,data);
		});
  };

  doPost = function (url, data, cbHttpFun) {
	  url = this._baseURL + url;
    this.http.post(url, data).
			success(function(data, status, headers, config) {
  		return cbHttpFun(data,null);
		}).
		error(function(data, status, headers, config) {
  		return cbHttpFun(null,data);
		});
  };

  doPut = function (url, data, cbHttpFun) {
	  url = this._baseURL + url;
    this.http.put(url, data).
			success(function(data, status, headers, config) {
  		return cbHttpFun(data,null);
		}).
		error(function(data, status, headers, config) {
  		return cbHttpFun(null,data);
		});
  };

  doDelete = function (url, cbHttpFun) {
	  url = this._baseURL + url;
    this.http.delete(url).
			success(function(data, status, headers, config) {
  		return cbHttpFun(data,null);
		}).
		error(function(data, status, headers, config) {
  		return cbHttpFun(null,data);
		});
  };
}
