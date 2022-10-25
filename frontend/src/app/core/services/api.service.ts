import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams, HttpParamsOptions } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    constructor(
        private http: HttpClient,
    ) { }

    private formatErrors(error: any) {
        console.log(error);
        return throwError(() => error.error);
    }

    get<T>(path: string, params?: HttpParams): Observable<T> {
        return this.http.get<T>(`${environment.api_url}${path}`, { ...params,});
    }

    patch<responseT,  bodyT>(path: string, body: Partial<bodyT>): Observable<responseT>{
        return this.http.patch<responseT>(`${environment.api_url}${path}`, body ).pipe(catchError(this.formatErrors));
    }

    post<responseT, bodyT>(path: string, body: bodyT, headers?: HttpHeaders): Observable<responseT> {
        return this.http.post<responseT>(`${environment.api_url}${path}`, body, {...headers}).pipe(catchError(this.formatErrors));
    }

    delete<T>(path: string): Observable<T> {
        return this.http.delete<T>(`${environment.api_url}${path}`).pipe(catchError(this.formatErrors));
    }
}
