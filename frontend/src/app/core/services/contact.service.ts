import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Contact, ContactParams } from '../models/contacts.model';
import { environment } from 'src/environments/environment';
import { HttpParams } from '@angular/common/http';


@Injectable({
    providedIn: 'root'
})
export class ContactService {
  constructor (
    private apiService: ApiService,
  ) { }

  get(params: ContactParams): Observable<Contact[]> {
    return this.apiService.get<Contact[]>('contact', new HttpParams({fromObject: {...params}}));
  }

  create() {

  }

  update() {

  }

  delete() {

  }

}
