import { catchError, take, takeWhile } from 'rxjs';
import { ContactService } from '../../core/services/contact.service';
import { FContactConfig, FContactModeEnum } from './models/form-contact.model';
import { Contact } from './../../core/models/contacts.model';
import { FormBuilder, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-form-contact',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './form-contact.component.html',
    styleUrls: ['./form-contact.component.scss']
})
export class FormContactComponent implements OnInit {
    @Output() isSuccess = new EventEmitter<boolean>();
    @Input() set data(data: Contact) {
        if(data){
            this.contactForm.patchValue({...data});
            this.id = data.id;
        }
    }
    @Input() set config(config: FContactConfig) {
        if(config){
            this.mode = config.mode;
            this.btnText = config.btnText;
        }
    };
    contactForm!: FormGroup;
    mode!: FContactModeEnum;
    btnText!: string;
    id?: number;

    constructor(
        private readonly fb: FormBuilder,
        private readonly contactService: ContactService
    ) { }

    ngOnInit(): void {
        this.contactForm = this.fb.group({
            name: ['', []],
            lastName: [''],
            email: [''],
            dni: [''],
            phone: [''],
            expelled: [false],
        });

        if(this.mode === FContactModeEnum.VIEW){
            this.disableInputs();
        }
    }

    changeMode(){
        this.mode = FContactModeEnum.EDIT;
        this.enableInputs();
    }

    submitForm() {
        if(this.mode === FContactModeEnum.EDIT){
            if(this.id){
                this.contactService.update(this.id, this.contactForm.value).pipe(take(1)).subscribe({
                    next: (res) => {
                        if(res){
                            this.mode = FContactModeEnum.VIEW;
                            this.disableInputs();
                            this.isSuccess.emit(true);
                        }
                    },
                    error: (error) => this.isSuccess.emit(false)
                });
            }
        }else{
            this.contactService.create(this.contactForm.value).pipe(take(1)).subscribe({
                next: (res) => {
                        if (res) {
                            this.contactForm.reset();
                            this.isSuccess.emit(true);
                        }
                }, 
                error: () => this.isSuccess.emit(false)
            })
        }
    }

    disableInputs() {
        Object.keys(this.contactForm.value).forEach((key: string) => {
            this.contactForm.get(key)?.disable();
        });
    }

    enableInputs() {
        Object.keys(this.contactForm.value).forEach((key: string) => {
            this.contactForm.get(key)?.enable();
        });
    }
}
