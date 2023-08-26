import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LoadingService } from './loading.service';

interface API {
    data: any;
    errorMessage: string;
    isSuccess: boolean;
    statusCode: number;
    successMessage: string;
}

@Injectable({
    providedIn: 'root'
})
export class HttpService {
    private serverUrl = environment.BASE_URL;

    constructor(private http: HttpClient) { }

    get<T>(apiName: string, param?: any): Observable<any> {
        return this.http.get<API>(`${this.serverUrl}${apiName}`, { params: param }).pipe(map((event) => {
            return event;
        }
        ));
    }

    post<T>(apiName: string, body?: any, showAlert = true): Observable<T> {
        return this.http.post<API>(`${this.serverUrl}${apiName}`, body ? body : null).pipe(map((event: any) => {
            return event.data;
        }));
    }


    put(apiName: string, body: any): Observable<any> {
        return this.http.put(`${this.serverUrl}${apiName}`, body).pipe(map((event: any) => {
            return event.data;
        }));
    }

    delete(apiName: string, body?: any): Observable<any> {
        return this.http.delete(`${this.serverUrl}${apiName}`, body).pipe(map((event: any) => {
            return event.data;
        }));
    }
}
