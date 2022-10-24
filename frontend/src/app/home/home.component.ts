import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { takeWhile } from 'rxjs';
import { Contact, ContactParams } from '../core/models/contacts.model';
import { ContactService } from '../core/services/contact.service';
import { UtilsService } from '../core/services/utils.service';
import { TColumnConfig, TOptionsEnum } from '../shared/table/models/table.model';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

    isSubmiting!: boolean;
    searchForm!: FormGroup;
    showListSection = false;
    isComponentActive = false;
    showModal = false;
    tableColumns: TColumnConfig[] = [
        { key: 'name', name: 'Nombre' },
        { key: 'lastName', name: 'Apellidos' },
        { key: 'phone', name: 'Telefono' },
        { key: 'dni', name: 'DNI' },
        { key: 'email', name: 'Email' },
        { key: 'expelled', name: 'No deseado' },
    ];
    contactList: Contact[] = [];

    constructor(
        private readonly fb: FormBuilder,
        private readonly utils: UtilsService,
        private readonly router: Router,
        private readonly contactService: ContactService
    ) { }

    ngOnInit(): void {
        this.isComponentActive = true;
        this.searchForm = this.fb.group({
            name: ['', []],
            lastName: [''],
            email: [''],
            dni: [''],
            phone: [''],
            expelled: [false],
        });
        this.showListSection = true;
    }

    ngOnDestroy(): void {
        this.isComponentActive = false;
    }

    submitForm(): void {
        let search: ContactParams = {
            ...this.searchForm.value,
            limit: 10,
            offset: 0
        };
        search = this.utils.removeEmptyProperties(search);
        this.contactService.get(search).pipe(takeWhile( () => this.isComponentActive === true)).subscribe((res: Contact[]) =>{
            this.contactList = [...res];
        })
    }

    redirect(id: number): void {
      this.router.navigateByUrl("/contacts/profile/" + id);
    } 

    deleteContact(id: number): void {

    }
}