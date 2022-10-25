import { ContactList } from './../models/contacts.model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Contact, ContactParams } from '../models/contacts.model';
import { HttpParams } from '@angular/common/http';


@Injectable({
    providedIn: 'root'
})
export class ContactService {
  constructor (
    private apiService: ApiService,
  ) {}

  get(params: ContactParams): Observable<ContactList> {
    return this.apiService.get<ContactList>('contact', new HttpParams({fromObject: {...params}}));
  }

  create() {

  }

  update() {

  }

  delete(id: number): Observable<string>{
    return this.apiService.delete<string>('contact/' + id);
  }

}
