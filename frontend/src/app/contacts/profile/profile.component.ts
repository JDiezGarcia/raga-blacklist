import { LogService } from './../../core/services/log.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TColumnConfig } from '../../shared/table/models/table.model';
import { MConfig } from '../../shared/modal/models/modal.model';
import { Log, LogList } from '../../core/models/logs.model';
import { UtilsService } from 'src/app/core/services/utils.service';
import { Router } from '@angular/router';
import { ContactService } from 'src/app/core/services/contact.service';
import { takeWhile } from 'rxjs';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
    @ViewChild('modal') modalContainer!: ElementRef;
    modalRef!: NgbModalRef;
    isSubmiting!: boolean;
    contactForm!: FormGroup;
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
    modalConfig!: MConfig;
    logList: Log[] = [];
    totalLogs: number = 0;
    logId?: number;
    currentPage: number = 1;
    limitPerPage = 10;
    contactId?: number;

    constructor(
        private readonly fb: FormBuilder,
        private readonly router: Router,
        private readonly contactService: ContactService,
        private readonly modalService: NgbModal,
        private readonly logService: LogService
    ) {}

    ngOnInit(): void {
        this.isComponentActive = true;
        this.contactForm = this.fb.group({
            name: ['', []],
            lastName: [''],
            email: [''],
            dni: [''],
            phone: [''],
            expelled: [false],
        });
    }

    ngOnDestroy(): void {
        this.isComponentActive = false;
    }

    paginate(page: number): void {
        this.currentPage = page;
        if(this.contactId){
            this.logService.get(this.contactId,this.limitPerPage, this.currentPage - 1).pipe(takeWhile(() => this.isComponentActive === true)).subscribe((res: LogList) => {
                if (res && res.logs && res.logs.length > 0) {
                    this.logList = [...res.logs];
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
            // this.logService.delete(this.contactId).pipe(takeWhile(() => !!this.isComponentActive)).subscribe((res) => {
            //     if (res) {
            //         this.logList = [...this.logList.filter(log => log.id !== this.contactId)];
            //     }
            //     this.closeModal();
            // });
        } else {
            this.closeModal();
        }
    }

    closeModal() {
        this.logId = undefined;
        this.modalRef.close();
    }

}
