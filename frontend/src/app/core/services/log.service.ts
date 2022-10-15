import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Contact } from '../models/contacts.model';


@Injectable()
export class LogService {
    constructor(
        private apiService: ApiService,
    ) { }

    get() {

    }

    create() {

    }

    update() {

    }

    delete() {

    }
}