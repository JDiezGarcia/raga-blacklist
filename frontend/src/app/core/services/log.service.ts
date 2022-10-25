import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Log, LogList } from '../models/logs.model';
import { HttpParams } from '@angular/common/http';
import { OkResponse } from '../models/response.model';


@Injectable({
    providedIn: 'root'
})
export class LogService {
    constructor(
        private apiService: ApiService,
    ) { }

    get(id: number, limit: number, offset: number): Observable<LogList> {
        return this.apiService.get<LogList>('log/'+id, new HttpParams({fromObject: {limit: limit, offset: offset}}));
    }

    create(id: number, log: Log): Observable<OkResponse> {
        return this.apiService.post<OkResponse, Log>('log/'+id, log);
    }

    delete(id: number) {
        return this.apiService.delete<OkResponse>('log/'+id);
    }
}