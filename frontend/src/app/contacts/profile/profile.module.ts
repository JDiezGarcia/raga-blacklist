import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ProfileComponent } from './profile.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TableComponent } from '../../shared/table/table.component';
import { ModalComponent } from '../../shared/modal/modal.component';
import { PaginationComponent } from '../../shared/pagination/pagination.component';
import { ProfileRoutingModule } from './profile-routing.module';
import { FormContactComponent } from '../form-contact/form-contact.component';

@NgModule({
    imports: [
        CommonModule,
        ProfileRoutingModule,
        ReactiveFormsModule,
        NgbModule,
        TableComponent,
        ModalComponent,
        PaginationComponent,
        FormContactComponent,
    ],
    declarations: [ProfileComponent],
    providers: [DatePipe]
})
export class ProfileModule { }
