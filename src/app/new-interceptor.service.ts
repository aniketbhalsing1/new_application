import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
  HttpErrorResponse,
  HttpHandler,
  HttpEvent,
  HttpHeaders
} from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class MyHttpLogInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  //  console.log('processing request', request);

    // const customReq = request.clone({
    //   headers: request.headers.set('Content-Type',  'application/json')
    // });

    const token: string = localStorage.getItem('Authorization');

    // add it if we have one
    if (token) {
        request = request.clone({ headers: request.headers.set('Authorization', token) });
    }

    if (!request.headers.has('Content-Type')) {
        request = request.clone({ headers: request.headers.set('Content-Type', 'application/json') });
    }

    // setting the accept header
    request = request.clone({ headers: request.headers.set('Accept', 'application/json') });
    //return next.handle(request);

    return next
      .handle(request)
      .do((ev: HttpEvent<any>) => {
        if (ev instanceof HttpResponse) {
//          console.log('processing response', ev);
        }
      })
      .catch(response => {
        if (response instanceof HttpErrorResponse) {
  //        console.log('Processing http error', response);
        }

        return Observable.throw(response);
      });
  }
}


// @Injectable()
// export class MyHttpLogInterceptor implements HttpInterceptor {
//   intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//     console.log('processing request', request);

//     // const customReq = request.clone({
//     //   headers: request.headers.set('app-language', 'it')
//     // });

//     const token: string = localStorage.getItem('Authorization');

//     // add it if we have one
//     if (token) {
//         request = request.clone({ headers: request.headers.set('Authorization', token) });
//     }

//     if (!request.headers.has('Content-Type')) {
//         request = request.clone({ headers: request.headers.set('Content-Type', 'application/json') });
//     }

//     // setting the accept header
//     request = request.clone({ headers: request.headers.set('Accept', 'application/json') });
//     //return next.handle(request);
    
//     return next
//       .handle(customReq)
//       .do((ev: HttpEvent<any>) => {
//         if (ev instanceof HttpResponse) {
//           console.log('processing response', ev);
//         }
//       })
//       .catch(response => {
//         if (response instanceof HttpErrorResponse) {
//           console.log('Processing http error', response);
//         }

//         return Observable.throw(response);
//       });
//   }
// }
