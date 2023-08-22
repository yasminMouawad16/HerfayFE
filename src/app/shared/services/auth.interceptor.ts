import { environment } from './../../../environments/environment';
import { HttpService } from './../services/http.service';
import { ToastrService } from 'ngx-toastr';
import {
    HttpInterceptor,
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpErrorResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
    providedIn: 'root',
})
export class AuthInterceptor implements HttpInterceptor {
    private token: string | null = null;
    currentLang = localStorage.getItem('userLang');

    constructor(
      private spinner: NgxSpinnerService,
        private http: HttpService,
        private router: Router,
        public toastr: ToastrService
    ) { }

    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {

        request = request.clone({
            setHeaders: {
                "CLIENT-TYPE": 'web',
                "CLIENT-VERSION": '1.0.0'
                //Authorization: `Bearer ` + token
                //"x-consumer-custom-id": "10001"
            },
        });

        if (request.url.includes(environment.BASE_URL)) {
          this.spinner.show(undefined,
            {
              type: 'ball-triangle-path',
              size: 'medium',
              bdColor: 'rgba(0, 0, 0, 0.8)',
              color: '#fff',
              fullScreen: true
            });
            return next.handle(request).pipe(
                catchError((error: HttpErrorResponse) => {
                    if (error && (error.status === 401 || error.status === 403)) {
                        // 401 errors are most likely going to be because we have an expired token that we need to refresh.
                        localStorage.removeItem('token');
                        this.router.navigate(['/sign-in']);
                        return throwError(error);
                    } else {
                        // alertHandling
                        if (error instanceof HttpErrorResponse) {
                            if (
                                error.status === 500 ||
                                error.status === 502 ||
                                error.status === 503
                            ) {
                              this.toastr.error(error.error.error.message ? error.error.error.message : '!Technical Error!');
                            } else if (error.status === 400) {
                              this.toastr.error(error.error.error.message ? error.error.error.message : '!BAD REQUEST!');
                            } else if (error.status === 404) {
                              this.toastr.error(error.error.error.message ? error.error.error.message : '!NOT FOUND!');
                            } else if (error.status === 415) {
                              this.toastr.error(error.error.error.message ? error.error.error.message : '!Unsupported Media Type!');
                            } else {
                              this.toastr.error(error.error.error.message ? error.error.error.message : '!!SYSTEM ERROR!');
                            }
                        }

                        return throwError(error);
                    }
                }),
                finalize(() => this.spinner.hide())
            );
        } else {
            return next.handle(request);
        }
    }
}
