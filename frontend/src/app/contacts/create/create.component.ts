import { ContactFields, ContactFieldsObj } from './../../core/models/contacts.model';
import { ErrorFields, ErrorMessages } from './../../core/models/response.model';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FContactConfig, FContactModeEnum } from '../form-contact/models/form-contact.model';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { MConfig } from 'src/app/shared/modal/models/modal.model';
import { UtilsService } from 'src/app/core/services/utils.service';

@Component({
    selector: 'app-create',
    templateUrl: './create.component.html',
    styleUrls: ['./create.component.scss']
})
export class CreateComponent {
    @ViewChild('modal') modalContainer!: ElementRef;
    modalRef!: NgbModalRef;
    formConfig: FContactConfig = {
        btnText: 'Crear',
        mode: FContactModeEnum.CREATE
    };
    modalConfig!: MConfig;
    
    constructor(
        private readonly modalService: NgbModal,
        private readonly utils: UtilsService
    ) { }

    isSuccess(success: boolean | ErrorFields) {
        if (typeof success === 'boolean') {
            this.modalConfig = {
                msg: 'Se creo el contacto correctamente.',
                title: 'Exito creando',
            };
        } else {
            if(success.validators){
                this.modalConfig = {
                    msg: this.utils.validatorMessage<ContactFields>(ContactFieldsObj, success),
                    title: ErrorMessages.validators,
                };
            }else {
                console.log('a')
                this.modalConfig = {
                    msg: 'Ya existe un contacto con ese DNI.',
                    title: ErrorMessages.exist,
                };
            }
        }
        this.modalRef = this.modalService.open(this.modalContainer, { centered: true });
    }

    closeModal() {
        this.modalRef.close();
    }

}
