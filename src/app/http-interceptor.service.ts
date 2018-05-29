import { Injectable } from '@angular/core';
import {
  Http,
  ConnectionBackend,
  RequestOptions,
  RequestOptionsArgs,
  Response,
  Headers,
  Request
} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
//import { environment } from '../../environments/environment';

// Shows Progress bar and notifications
//import { NotifyService } from "./loader";

@Injectable()
export class HttpInterceptorService extends Http {

  constructor(
    backend: ConnectionBackend,
    defaultOptions: RequestOptions,
    //private notifyService: NotifyService
  ) {
    super(backend, defaultOptions);
  }

  /**
   * Performs a request with `get` http method.
   * @param url
   * @param options
   * @returns {Observable<>}
   */
  get(url: string, options?: RequestOptionsArgs): Observable<any> {
    this.beforeRequest();
    return super.get(this.getFullUrl(url), this.requestOptions(options))
      .catch(this.onCatch)
      .do((res: Response) => {
        this.onSuccess(res);
      }, (error: any) => {
        this.onError(error);
      })
      .finally(() => {
        this.onFinally();
      });
  }

  Post(url: string, data: any, options?: RequestOptionsArgs): Observable<any> {
    this.beforeRequest();
    return super.post(this.getFullUrl(url), data, this.requestOptions(options))
      .catch(this.onCatch)
      .do((res: Response) => {
        this.onSuccess(res);
      }, (error: any) => {
        this.onError(error);
      })
      .finally(() => {
        this.onFinally();
      });
  }

  Put(url: string, data: any, options?: RequestOptionsArgs): Observable<any> {
    this.beforeRequest();
    return super.put(this.getFullUrl(url), data, this.requestOptions(options))
      .catch(this.onCatch)
      .do((res: Response) => {
        this.onSuccess(res);
      }, (error: any) => {
        this.onError(error);
      })
      .finally(() => {
        this.onFinally();
      });
  }
   
  Delete(url: string, options?: RequestOptionsArgs): Observable<any> {
    this.beforeRequest();
    return super.delete(this.getFullUrl(url), this.requestOptions(options))
      .catch(this.onCatch)
      .do((res: Response) => {
        this.onSuccess(res);
      }, (error: any) => {
        this.onError(error);
      })
      .finally(() => {
        this.onFinally();
      });
  }

  /**
   * Request options.
   * @param options
   * @returns {RequestOptionsArgs}
   */
  private requestOptions(options?: RequestOptionsArgs): RequestOptionsArgs {
    alert("hii")
    if (options == null) {
      options = new RequestOptions();
    }
    if (options.headers == null) {
      options.headers = new Headers({
        //'Authorization': `Basic ${environment.basic_auth_token}`,
        //'X-Auth-Token': localStorage.getItem('access_token')
        'Content-Type' : 'application/json',
        'Authorization': localStorage.getItem('Authorization'),        
        
      });
    }
    return options;
  }

  /**
   * Build API url.
   * @param url
   * @returns {string}
   */
  private getFullUrl(url: string): string {
    // return environment.apiEndpoint + url;
    return 'http://dipz.ml/api/doctor/' + url;
  }

  /**
   * Before any Request.
   */
  private beforeRequest(): void {
    //this.notifyService.showPreloader();
  }

  /**
   * After any request.
   */
  private afterRequest(): void {
    //this.notifyService.hidePreloader();
  }

  /**
   * Error handler.
   * @param error
   * @param caught
   * @returns {ErrorObservable}
   */
  private onCatch(error: any, caught: Observable<any>): Observable<any> {
    //this.notifyService.popError();
    return Observable.throw(error);
  }

  /**
   * onSuccess
   * @param res
   */
  private onSuccess(res: Response): void {
    //console.log(res);
  }

  /**
   * onError
   * @param error
   */
  private onError(error: any): void {
    //this.notifyService.popError();
  }

  /**
   * onFinally
   */
  private onFinally(): void {
    this.afterRequest();
  }
}