import { HttpClientModule } from '@angular/common/http';
import { ModalComponent } from './../shared/modal/modal.component';
import { HomeRoutingModule } from './home-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TableComponent } from '../shared/table/table.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PaginationComponent } from '../shared/pagination/pagination.component';
import { FileSaverModule} from 'ngx-filesaver';

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule,
    TableComponent,
    ModalComponent,
    PaginationComponent,
    FileSaverModule,
  ],
})
export class HomeModule { }
