import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { RouterModule } from '@angular/router';
import { PaginationComponent } from './pagination/pagination.component';


@NgModule({
  declarations: [
    PaginationComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    RouterModule,
  ],
  exports: [
    PaginationComponent,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule,
    RouterModule,
  ],
})
export class SharedModule {}
