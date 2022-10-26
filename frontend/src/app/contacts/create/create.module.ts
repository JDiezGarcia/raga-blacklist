import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateComponent } from './create.component';
import { CreateRoutingModule } from './create-routing.module';
import { FormContactComponent } from '../form-contact/form-contact.component';
import { ModalComponent } from '../../shared/modal/modal.component';

@NgModule({
  imports: [
    CommonModule,
    CreateRoutingModule,
    FormContactComponent,
    NgbModalModule,
    ModalComponent
  ],
  declarations: [CreateComponent]
})
export class CreateModule { }
