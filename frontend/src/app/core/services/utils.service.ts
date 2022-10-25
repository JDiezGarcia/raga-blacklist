import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiService } from './api.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OkResponse } from '../models/response.model';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class UtilsService {

    constructor(private readonly api:ApiService, private readonly http: HttpClient){}

    removeEmptyProperties<T extends Object>(obj: T): T {
        type Keys = keyof typeof obj;
        Object.keys(obj).forEach(key => {
            const typeKey = key as Keys;
            if(!obj[typeKey] && obj[typeKey] !== 0){
                delete obj[typeKey];
            }
        })
        return obj;
    }

    upload(file: FormData): Observable<OkResponse> {
        return this.api.post<OkResponse, FormData>('db/', file);
    }

    download(): Observable<Blob>{
        return this.http.get<Blob>(environment.api_url + 'db/', { responseType: 'blob' as 'json' });
    }
}
