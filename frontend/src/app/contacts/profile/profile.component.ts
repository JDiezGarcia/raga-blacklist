import { FContactConfig, FContactModeEnum } from './../form-contact/models/form-contact.model';
import { TOptionsConfig } from './../../shared/table/models/table.model';
import { LogService } from './../../core/services/log.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TColumnConfig } from '../../shared/table/models/table.model';
import { MConfig } from '../../shared/modal/models/modal.model';
import { Log, LogList } from '../../core/models/logs.model';
import { UtilsService } from 'src/app/core/services/utils.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ContactService } from 'src/app/core/services/contact.service';
import { take, takeWhile } from 'rxjs';
import { throws } from 'assert';
import { Contact } from 'src/app/core/models/contacts.model';
import { DatePipe } from '@angular/common';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
    @ViewChild('modal') modalContainer!: ElementRef;
    modalRef!: NgbModalRef;
    isSubmiting!: boolean;
    logForm!: FormGroup;
    showListSection = false;
    isComponentActive = false;
    showModal = false;
    tableColumns: TColumnConfig[] = [
        { key: 'description', name: 'Descripcion' },
        { key: 'dateLog', name: 'Fecha del suceso' },
        { key: 'employee', name: 'Trabajador'}
    ];
    tableOptions: TOptionsConfig = {
        delete: true
    };
    formConfig: FContactConfig = {
        btnText: 'Guardar',
        mode: FContactModeEnum.VIEW
    }
    modalConfig!: MConfig;
    logList: Log[] = [];
    totalLogs: number = 0;
    logId?: number;
    currentPage: number = 1;
    limitPerPage = 10;
    contactId?: number;
    currentContact!: Contact;

    constructor(
        private readonly fb: FormBuilder,
        private readonly router: Router,
        private readonly contactService: ContactService,
        private readonly modalService: NgbModal,
        private readonly logService: LogService,
        private readonly route: ActivatedRoute,
        private readonly datePipe: DatePipe,
    ) {}

    ngOnInit(): void {
        this.isComponentActive = true;
        this.route.params.pipe(takeWhile(() => !!this.isComponentActive)).subscribe((param) => {
            this.contactId = param.id;
        });
        if(this.contactId){
            this.contactService.getProfile(this.contactId).pipe(takeWhile(() => !!this.isComponentActive)).subscribe((contact) => {
                this.currentContact = contact;
            })
            this.paginate(1);
        }
        this.logForm = this.fb.group({
            description: ['', Validators.required],
            dateLog: ['', Validators.required],
            employee: [''],
        })
    }

    ngOnDestroy(): void {
        this.isComponentActive = false;
    }

    paginate(page: number): void {
        this.currentPage = page;
        if(this.contactId){
            this.logService.get(this.contactId,this.limitPerPage, this.currentPage - 1).pipe(takeWhile(() => this.isComponentActive === true)).subscribe((res: LogList) => {
                if (res && res.logs && res.logs.length > 0) {
                    this.logList = [...res.logs.map((log) => {
                        return { ...log, dateLog: this.transformDate(log.dateLog) };
                    })];
                    this.totalLogs = Math.ceil(res.total / this.limitPerPage);
                    this.showListSection = true;
                } else {
                    this.modalConfig = {
                        msg: 'No se han encontrado resultados.',
                        title: 'Sin resultados',
                    };
                    this.modalRef = this.modalService.open(this.modalContainer, { centered: true });
                    this.showListSection = false;
                    this.currentPage = 1;
                }
            });
        }
    }
    transformDate(date: string): string {
        const dateFormat = this.datePipe.transform(date, 'yyyy/MM/dd');
        return dateFormat ? dateFormat : '';
    }
    redirect(id: number): void {
        this.router.navigateByUrl("/contacts/profile/" + id);
    }

    deleteContact(id: number): void {
        this.logId = id;
        this.modalConfig = {
            msg: '¿Seguro que desea eliminar el registro?',
            title: 'Eliminar registro',
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
        this.modalRef = this.modalService.open(this.modalContainer, { centered: true });
    }

    confirmDelete() {
        if (this.logId) {
            this.logService.delete(this.logId).pipe(takeWhile(() => !!this.isComponentActive)).subscribe((res) => {
                if (res) {
                    this.logList = [...this.logList.filter(log => log.id !== this.logId)];
                }
                this.closeModal();
            });
        } else {
            this.closeModal();
        }
    }

    isSuccess(success: boolean) {
        if(success){
            this.modalConfig = {
                msg: 'Se modificaron los campos correctamente.',
                title: 'Actualizacion',
            };
        }else{
            this.modalConfig = {
                msg: 'Se ha recibido un error al modificar.',
                title: 'Error',
            };
        }
        this.modalRef = this.modalService.open(this.modalContainer, { centered: true });
    }

    submitForm() {
        if(this.contactId){
            this.logService.create(this.contactId, this.logForm.value).pipe(take(1)).subscribe((res) =>{
                if(res){
                    this.logList = [...this.logList, this.logForm.value];
                    this.logForm.reset();
                }
            })
        }
    }

    closeModal() {
        this.logId = undefined;
        this.modalRef.close();
    }

}
