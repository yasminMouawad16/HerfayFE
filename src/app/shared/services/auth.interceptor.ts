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
import { LoadingService } from './loading.service';
import { LanguageService } from './language.service';

@Injectable({
    providedIn: 'root',
})
export class AuthInterceptor implements HttpInterceptor {

    constructor(
        private router: Router,
        public toastr: ToastrService,
        private loadingService: LoadingService
    ) { }

    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {

        request = request.clone({
            setHeaders: {
              'Content-Type': 'application/json',
              'Accept': '*/*',
              'Accept-Language' : localStorage.getItem('lang') || 'en'
            },
        });

        if (request.url.includes(environment.BASE_URL)) {
            this.loadingService.setLoading(true, request.url);
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
                              this.toastr.error(error.error.errors[0] ? error.error.errors[0] : '!Technical Error!');
                            } else if (error.status === 400) {
                              this.toastr.error(error.error.errors ? error.error.errors[0] : '!BAD REQUEST!');
                            } else if (error.status === 404) {
                              this.toastr.error(error.error.errors ? error.error.errors[0] : '!NOT FOUND!');
                            } else if (error.status === 415) {
                              this.toastr.error(error.error.errors ? error.error.errors[0] : '!Unsupported Media Type!');
                            } else {
                              this.toastr.error(error.error.errors ? error.error.errors[0] : '!!SYSTEM ERROR!');
                            }
                        }

                        return throwError(error);
                    }
                }),
                finalize(() => this.loadingService.setLoading(false, request.url))
            );
        } else {
            return next.handle(request);
        }
    }
}
