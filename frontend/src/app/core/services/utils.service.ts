import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { ApiService } from './api.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ErrorFields, OkResponse } from '../models/response.model';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class UtilsService {

    constructor(
        private readonly api:ApiService, 
        private readonly http: HttpClient,
        private readonly sanitizer: DomSanitizer
    ){}

    removeEmptyProperties<T extends Object>(obj: T): T {
        type Keys = keyof typeof obj;
        Object.keys(obj).forEach(key => {
            const typeKey = key as Keys;
            if(!obj[typeKey] && obj[typeKey] !== 0){
                delete obj[typeKey];
            }
        });
        return obj;
    }

    validatorMessage<T extends Object>(msgs: T, error: ErrorFields ): SafeHtml | string {
        let errorMsg: string = '';
        Object.keys(error.validators).forEach((key) => {
            errorMsg += `<p>${msgs[key as keyof T]}</p><ul>`;
            error.validators[key].forEach((error) => {
                errorMsg += `<li>${error}.</li>`;
            })
            errorMsg += `</ul>`
        });
        return this.sanitizer.bypassSecurityTrustHtml(errorMsg);
    }

    upload(file: FormData): Observable<OkResponse> {
        return this.api.post<OkResponse, FormData>('db/', file);
    }

    download(): Observable<Blob>{
        return this.http.get<Blob>(environment.api_url + 'db/', { responseType: 'blob' as 'json' });
    }
}
