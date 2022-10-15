import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError} from 'rxjs/operators';

@Injectable()
export class ApiService {
    constructor(
        private http: HttpClient,
    ) { }

    private formatErrors(error: any) {
        return throwError(error.error);
    }

    get<T>(path: string, params?: HttpParams): Observable<T> {
        return this.http.get<T>(`${environment.api_url}${path}`, { params }).pipe(catchError(this.formatErrors));
    }

    put<responseT, bodyT>(path: string, body: bodyT): Observable<responseT> {
        return this.http.put<responseT>(`${environment.api_url}${path}`, body ).pipe(catchError(this.formatErrors));
    }

    post<responseT, bodyT>(path: string, body: bodyT): Observable<responseT> {
        return this.http.post<responseT>(`${environment.api_url}${path}`, body).pipe(catchError(this.formatErrors));
    }

    delete<T>(path: string): Observable<T> {
        return this.http.delete<T>(`${environment.api_url}${path}`).pipe(catchError(this.formatErrors));
    }
}
