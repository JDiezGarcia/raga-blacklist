import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Contact } from '../models/contacts.model';
import { LogList } from '../models/logs.model';
import { HttpParams } from '@angular/common/http';


@Injectable({
    providedIn: 'root'
})
export class LogService {
    constructor(
        private apiService: ApiService,
    ) { }

    get(id: number, limit: number, offset: number): Observable<LogList> {
        return this.apiService.get<LogList>('/profile/'+id, new HttpParams({fromObject: {limit: limit, offset: offset}}));
    }

    create() {

    }

    update() {

    }

    delete() {

    }
}