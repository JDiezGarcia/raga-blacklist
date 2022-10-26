import { OkResponse } from './../models/response.model';
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

  getProfile(id: number): Observable<Contact> {
    return this.apiService.get<Contact>('contact/' + id);
  }

  create(contact: Contact) {
      return this.apiService.post<OkResponse, Contact>('contact', contact);
  }

  update(id: number, contact: Contact): Observable<OkResponse> {
    return this.apiService.patch<OkResponse, Contact>('contact/'+id, contact);
  }

  delete(id: number): Observable<OkResponse>{
    return this.apiService.delete<OkResponse>('contact/' + id);
  }

}
