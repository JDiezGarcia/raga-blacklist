import { FileSaverService } from 'ngx-filesaver';
import { MConfig } from './../shared/modal/models/modal.model';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { takeWhile } from 'rxjs';
import { Contact, ContactList, ContactParams } from '../core/models/contacts.model';
import { ContactService } from '../core/services/contact.service';
import { UtilsService } from '../core/services/utils.service';
import { TColumnConfig, TOptionsConfig } from '../shared/table/models/table.model';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

    @ViewChild('modal') modalContainer!: ElementRef;
    modalRef!: NgbModalRef;
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
    tableOptions: TOptionsConfig = {
        view: true,
        delete: true
    };
    modalConfig!: MConfig;
    contactList: Contact[] = [];
    totalContacts: number = 0;
    contactId?: number;
    currentPage: number = 1;
    limitPerPage = 10;

    constructor(
        private readonly fb: FormBuilder,
        private readonly utils: UtilsService,
        private readonly router: Router,
        private readonly contactService: ContactService,
        private readonly modalService: NgbModal,
        private readonly fs: FileSaverService,
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
    }

    uploadFile(event: Event) {
        const formData: FormData = new FormData();
        const target = event.target as HTMLInputElement;
        if(target && target.files && target.files.length > 0){
            formData.append('sql', target.files[0]);
        }
        this.utils.upload(formData).pipe(takeWhile(() => !!this.isComponentActive)).subscribe({
            next: () => {
                this.modalConfig = {
                    msg: 'Se ha subido la Base de Datos correctamente',
                    title: 'Exito - Subida',
                };
                this.modalRef = this.modalService.open(this.modalContainer, { centered: true });
            },
            error: () => {
                this.modalConfig = {
                    msg: 'Error en subida de la Base de Datos.',
                    title: 'Error - Subida',
                };
                this.modalRef = this.modalService.open(this.modalContainer, { centered: true });
            }
        })
    }

    downloadFile(){
        this.utils.download().pipe(takeWhile(() => !!this.isComponentActive)).subscribe({
            next: (sql) => {
                this.fs.save(sql, 'raga-blacklist.sqlite');
                this.modalConfig = {
                    msg: 'Se ha descargado la Base de Datos correctamente',
                    title: 'Exito - Descarga',
                };
                this.modalRef = this.modalService.open(this.modalContainer, { centered: true });
            },
            error: (e) => {
                console.log(e)
                this.modalConfig = {
                    msg: 'Error en descarga de la Base de Datos.',
                    title: 'Error - Descarga',
                };
                this.modalRef = this.modalService.open(this.modalContainer, { centered: true });
            }
        })
    }



    ngOnDestroy(): void {
        this.isComponentActive = false;
    }

    submitForm(reset = false): void {
        if(reset){
            this.currentPage = 1;
        }
        let search: ContactParams = {
            ...this.searchForm.value,
            limit: this.limitPerPage,
            offset: this.currentPage - 1
        };
        search = this.utils.removeEmptyProperties(search);
        this.contactService.get(search).pipe(takeWhile( () => this.isComponentActive === true)).subscribe((res: ContactList) =>{
            if(res && res.contacts && res.contacts.length > 0) {
                this.contactList = [...res.contacts];
                this.totalContacts = Math.ceil(res.total / this.limitPerPage);
                this.showListSection = true;
            }else{
                this.modalConfig = {
                    msg: 'No se han encontrado resultados.',
                    title: 'Sin resultados',
                };
                this.modalRef = this.modalService.open(this.modalContainer, {centered: true});
                this.showListSection = false;
                this.currentPage = 1; 
            }
        });
    }

    redirect(id: number): void {
      this.router.navigateByUrl("/contacts/profile/" + id);
    } 

    deleteContact(id: number): void{
        this.contactId = id;
        this.modalConfig = {
            msg: '¿Seguro que desea eliminar el contacto?',
            title: 'Eliminar contacto',
            close: {
                text: 'Cancelar',
                colorB: 'bg-black',
                colorT: 'text-white'
            },
            confirm: {
                text: 'Eliminar',
                colorB: 'bg-danger',
                colorT: 'text-white'
            }
        };
        this.modalRef = this.modalService.open(this.modalContainer, {centered: true});
    }

    confirmDelete(){
        if(this.contactId){
            this.contactService.delete(this.contactId).pipe(takeWhile( () => !!this.isComponentActive)).subscribe((res) => {
                if(res){
                    this.contactList =[...this.contactList.filter(contact => contact.id !== this.contactId)];
                }
                this.closeModal();
            });
        }else{
            this.closeModal();
        }
    }

    paginate(page: number){
        this.currentPage = page;
        this.submitForm();
    }

    closeModal() {
        this.contactId = undefined;
        this.modalRef.close();
    }
}