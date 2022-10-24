import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TColumnConfig, TData, TOptionsEnum } from './models/table.model';
import { faEye, faTrash, IconDefinition, } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-table',
    standalone: true,
    imports: [CommonModule, FontAwesomeModule],
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.scss'],
})
export class TableComponent {
    @Output() delete = new EventEmitter<number>();
    @Output() view = new EventEmitter<number>();
    @Input()columns!: TColumnConfig[];
    @Input()data!: TData[];
    eyeIcon: IconDefinition = faEye;
    trashIcon: IconDefinition = faTrash;
    optionsType = TOptionsEnum;

    selectOne(id: number, option: TOptionsEnum): void{
        switch (option) {
            case TOptionsEnum.View:
                this.view.emit(id);
                break;
            case TOptionsEnum.Delete:
                this.delete.emit(id);
                break;
        }
    }
}