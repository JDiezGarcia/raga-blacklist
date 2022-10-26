import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError} from 'rxjs/operators';
import { ErrorMessages, ErrorResponse, ErrorsValidators } from '../models/response.model';

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    constructor(
        private http: HttpClient,
    ) {}

    private formatErrors(error: ErrorResponse) {
        return throwError(() => {
            if (error.error && error.error.validators){
                Object.keys(error.error.validators).forEach((key) => {
                    const newArr: string[] = [];
                    
                    error.error.validators[key].forEach( (err: string) => {
                        newArr.push(ErrorMessages[err as ErrorsValidators]);
                    })
                    error.error.validators[key] = newArr;
                })
                return error.error;
            }else{
                return error.error;
            }
        });
    }

    get<T>(path: string, params?: HttpParams): Observable<T> {
        return this.http.get<T>(`${environment.api_url}${path}`, { ...params,});
    }

    patch<responseT,  bodyT>(path: string, body: Partial<bodyT>): Observable<responseT>{
        return this.http.put<responseT>(`${environment.api_url}${path}`, body ).pipe(catchError(this.formatErrors));
    }

    post<responseT, bodyT>(path: string, body: bodyT, headers?: HttpHeaders): Observable<responseT> {
        return this.http.post<responseT>(`${environment.api_url}${path}`, body, {...headers}).pipe(catchError(this.formatErrors));
    }

    delete<T>(path: string): Observable<T> {
        return this.http.delete<T>(`${environment.api_url}${path}`).pipe(catchError(this.formatErrors));
    }
}
